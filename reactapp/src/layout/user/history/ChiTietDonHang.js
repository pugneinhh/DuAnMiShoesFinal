import { Avatar, Flex, Button, Space, Tabs, Tag } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { BsShop } from "react-icons/bs";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { TfiPencil } from "react-icons/tfi";
import "./history.css";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import { GiNotebook, GiPiggyBank, GiReturnArrow } from "react-icons/gi";
import { SlNotebook } from "react-icons/sl";
import { RiTruckFill } from "react-icons/ri";
import { FaTruckFast } from "react-icons/fa6";
import LogoGHN from "../../../assets/images/LogoGHN.png";
import { HoaDonClientAPI } from "../../../pages/censor/api/HoaDonClient/HoaDonClientAPI";
import { HoaDonAPI } from "../../../pages/censor/api/hoaDon/hoaDon.api";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import { MdArrowBackIos } from "react-icons/md";
import { get, set } from "local-storage";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
const ChiTietDonHang = (props) => {
  const idHD = useParams();
    const storedData = get("userData");
      const [userName, setUserName] = useState("");
      const [AnhUser, setLinkAnhUser] = useState("");
  const nav = useNavigate();
  const [listBillHistory, setListBillHistory] = useState([]);
  const [listTimeLine, setlistTimeLine] = useState([]);
  const [statusPresent, setStatusPresent] = useState([]);
  const [bill, setBill] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
      const taiKhoanCuaToi = () => {
        nav("/tai-khoan-cua-toi");
      };
       var stomp = null;
       const socket = new SockJS("http://localhost:8080/ws");
       stomp = Stomp.over(socket);

       useEffect(() => {
         stomp.connect({}, () => {
           console.log("connect websocket");

           stomp.subscribe("/topic/KH/hoa-don", (mes) => {
             try {
               const pare = JSON.parse(mes.body);
               console.log(pare);
               // ví du: bạn muốn khi khách hàng bấm đặt hàng mà load lại hóa đơn màn admin thì hãy gọi hàm load all hóa đơn ở đây
               // thí dụ: đây là hàm laod hóa đơn: loadHoaDon(); allThongBao(); CountThongBao();
               loadTimeLine();
         
             } catch (e) {
               console.log("lỗi mẹ ròi xem code di: ", e);
             }
           });
         });

         return () => {
           stomp.disconnect();
         };
       }, []);
       
  useEffect(() => {
       setUserName(storedData.ten);
       setLinkAnhUser(storedData.anh);
    HoaDonClientAPI.DetailHoaDonClient(idHD.idHD).then((res) => {
      setBill(res.data);
    });
loadTimeLine();

  }, []);
  const loadTimeLine = () => {
    HoaDonAPI.getAllLichSuHoaDon(idHD.idHD).then((res) => {
      setlistTimeLine(res.data);
      console.log(res);
    });
  };
    const goBack = () => {
      window.history.back(); // Quay lại trang trước đó trong lịch sử duyệt
    };
  const VALUES = [
    "Chờ xác nhận",
    "Xác nhận",
    "Chờ vận chuyển",
    "Đang vận chuyển",
    "Đã thanh toán",
    "Thành công",
  ];
  const textButton = [
    "Xác nhận",
    "Chờ vận chuyển",
    "Đang vận chuyển",
    "Đã thanh toán",
    "Thành công",
  ];
  const showIcon = (trangThai) => {
    if (trangThai === "0") {
      return GiNotebook;
    } else if (trangThai === "1") {
      return SlNotebook;
    } else if (trangThai === "2") {
      return RiTruckFill;
    } else if (trangThai === "3") {
      return FaTruckFast;
    } else if (trangThai === "4") {
      return GiPiggyBank;
    } else if (trangThai === "5") {
      return FaCheckCircle;
    } else if (trangThai === "-1") {
      return GiReturnArrow;
    }
  };
  const showTitle = (trangThai) => {
    if (trangThai === "0") {
      return "Chờ xác nhận";
    } else if (trangThai === "1") {
      return "Xác Nhận";
    } else if (trangThai === "2") {
      return "Chờ vận chuyển";
    } else if (trangThai === "3") {
      return "Đang vận chuyển";
    } else if (trangThai === "4") {
      return "Đã thanh toán";
    } else if (trangThai === "5") {
      return "Thành công";
    } else if (trangThai === "-1") {
      return "Hủy";
    }
  };
  return (
    <>
      <div className="container ">
        <div className="row pt-3 ">
          <div className="col-md-2">
            <div className="row">
              <div className="col-md-2">
                <Avatar
                  style={{ width: 50, height: 50 }}
                  shape="circle"
                  className="align-content-start"
                  // size="large"
                  src={AnhUser}
                  // src="data:image/jpeg;base64,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"
                />
              </div>
              <div className="col-md-10 " style={{ paddingLeft: 40 }}>
                <div className="fw-bold">
                  <h6>
                    <b>{userName}</b>
                  </h6>
                </div>
                <div className="ms-1">
                  <TfiPencil size={15} />
                  <span className="ms-2">Sửa hồ sơ</span>
                </div>
              </div>
            </div>

            <hr></hr>

            <div onClick={taiKhoanCuaToi}>
              <FaUser className="ms-2" size={20} style={{ color: "red" }} />
              <span className="ms-3 ">
                <b>Tài khoản của tôi</b>
              </span>
            </div>
            <div className="mt-3 ">
              <BsShop className="ms-2" size={20} style={{ color: "red" }} />
              <span className="ms-4 ">
                <b>Đơn mua</b>
              </span>
            </div>
          </div>

          {/* Tab */}
          <div className="col-md-10 ">
            <div className="row" style={{ borderBottom: "1px solid #000" }}>
              <div onClick={goBack} className="col button-back">
                <MdArrowBackIos /> <span className="fs-6">Trở lại</span>
              </div>
              <div className="col d-flex justify-content-end">
                <p className="me-4">Mã đơn hàng : {bill.ma}</p> |
                <span className="text-danger ms-4">
                  {bill.trangThai === "0"
                    ? "Chờ xác nhận"
                    : bill.trangThai === "1"
                    ? "Xác nhận"
                    : bill.trangThai === "2"
                    ? "Chờ vận chuyển"
                    : bill.trangThai === "3"
                    ? "Đang vận chuyển"
                    : bill.trangThai === "4"
                    ? "Đã thanh toán"
                    : bill.trangThai === "5"
                    ? "Thành công"
                    : bill.trangThai === "6"
                    ? "Trả hàng"
                    : bill.trangThai === "-1"
                    ? "Đã hủy"
                    : "Đã"}
                </span>
              </div>
            </div>

            {/* hóa đơn time line */}
            <div className="scroll-hoa-don mt-5 mb-4">
              <div className="hoa-don-cuon-ngang">
                <Timeline
                  minEvents={6}
                  // maxEvents={10}
                  style={{ borderBottom: "1px solid rgb(224, 224, 224)" }}
                  placeholder
                >
                  {listTimeLine.map((item, index) => (
                    <TimelineEvent
                      minEvents={6}
                      key={index}
                      color={"#3d874d"}
                      icon={showIcon(item.trangThai)}
                      values={showTitle(item.trangThai)}
                      isOpenEnding={true}
                      title={showTitle(item.trangThai)}
                      subtitle={moment(item.ngayTao).format(
                        "hh:mm:ss DD/MM/YYYY"
                      )}
                    />
                  ))}
                </Timeline>
              </div>
            </div>

            <hr className="mt-5 mb-3"></hr>

            {/* địa chỉ giao hàng */}
            <div className="ms-4">
              <h4>Địa chỉ nhận hàng</h4>
              <p>{bill.tenNguoiNhan}</p>
              <p>{bill.sdt}</p>
              <p>{bill.diaChiShip}</p>
            </div>

            <hr className="mt-5 mb-3"></hr>
            {/* thanh toán */}
            <div className="ms-4">
              <h4>Thanh toán</h4>
              <div className="row">
                <div className="col-md-6"></div>
                <div className="col-md-6 fs-6">
                  <div className="row">
                    <div className="col ">Tổng tiền hàng:</div>
                    <div className="col">
                      {Intl.NumberFormat("en-US").format(bill.giaGoc)} VND
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">Phí vận chuyển:</div>
                    <div className="col">
                      {Intl.NumberFormat("en-US").format(bill.tienVanChuyen)}
                      VND
                    </div>
                  </div>
                  <div
                    className="row mt-3"
                    style={{ borderBottom: "1px solid #000" }}
                  >
                    <div className="col">Voucher cửa hàng:</div>
                    <div className="col">
                      {Intl.NumberFormat("en-US").format(bill.giaGiamGia)} VND
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <b>Thành tiền</b>
                    </div>
                    <div className="col text-danger fs-5">
                      <b>
                        {Intl.NumberFormat("en-US").format(bill.thanhTien)} VND
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-5 mb-3"></hr>
            {/* phương thức thanh toán */}
            <div className="ms-4 d-flex justify-content-start">
              <h5 className=" mt-4">Ngày dự kiến:</h5>
              <p className="ms-5 mt-1">
                <img src={LogoGHN} style={{ width: 200, height: 70 }}></img>
              </p>

              <p className="mt-4 ms-5 fs-5 text-danger ">
                <b> {bill.ngayDuKienNhan}</b>
              </p>
            </div>
            <hr className="mt-5 mb-3"></hr>
            {/* phương thức thanh toán */}
            <div className="ms-4 d-flex justify-content-start">
              <h5 className=" mt-1">Phương thức thanh toán :</h5>
              <p className="ms-5 mt-1">
                <b>Thanh toán khi nhận hàng</b>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
};
export default ChiTietDonHang;

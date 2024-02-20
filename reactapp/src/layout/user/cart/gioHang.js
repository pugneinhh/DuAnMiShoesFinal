import React, { useEffect, useState } from "react";
import "./gioHang.css";
import { Button, Switch, Tag } from "antd";
import { FaRegTrashAlt, FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";
import ModalDiaChi from "./modalDiaChi";
import ModalVoucher from "./modalVoucher";
import { Link } from "react-router-dom";
import ProductRow from "./gioHangrow";
import { GioHangAPI } from "../../../pages/censor/api/gioHang/gioHang.api";
import { get, set } from "local-storage";
import DiaChiGiaoHang from "./GiaoHang";
import LogoVNP from "../../../assets/images/vnp.png";
import { BanHangClientAPI } from "../../../pages/censor/api/banHangClient/banHangClient.api";
import { v4 as uuid } from "uuid";
export const GioHang = ({ children }) => {
  const [openModalDiaChi, setOpenModalDiaChi] = useState(false);
  const [openModalVoucher, setOpenModalVoucher] = useState(false);
  const [khachHang, setKhachHang] = useState(null);
  const [gioHangCT, setGioHangCT] = useState([]);
  const [userID, setUserID] = useState("");
 
    
   
  
  useEffect(() => {
    if (storedData !== null) {
      setUserID(storedData.userID)
    }
  }, []);
  let total = 0;
  let sale=0;
  const storedData = get("userData");
  const storedGioHang = get("GioHang");

  useEffect(() => {
    if (storedData != null) {
      setKhachHang(storedData.userID);
    }
    loadGHCT();
  }, []);
  const loadGHCT = () => {
    if (storedData !== null) {
      GioHangAPI.getByIDKH(storedData.userID).then((response) => {
        GioHangAPI.getAllGHCTByIDGH(response.data.id).then((res) => {
          setGioHangCT(res.data);
          console.log("GioHangct", res.data);
        });
      });
    }
    if (storedGioHang !== null) {
      GioHangAPI.getByID(storedGioHang.id).then((res) => {
        GioHangAPI.getAllGHCTByIDGH(res.data.id).then((res) => {
          setGioHangCT(res.data);
          console.log("GioHan", res.data);
        });
      });
    }
  };
  const detailDiaChi = (row) => {
    console.log("click", row);
    // setIdKH(row);
    setOpenModalDiaChi(true);
  };
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSwitchTraSau, setIsSwitchTraSau] = useState(false);
  const [isDiaChiGiaoHangVisible, setIsDiaChiGiaoHangVisible] = useState(false);

  const handleMuaHang=(total,sale,gioHangCT,khachHang)=>{
    const currentDate = new Date();
    const currentDateInMilliseconds = Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const idHD = uuid();
    const hoaDon={ 
      id:idHD,
      ma:'HD'+currentDateInMilliseconds,
      nguoiDung:khachHang,
      giaGoc:total,
      giaGiamGia:sale,
      thanhTien:total-sale,
    }
    BanHangClientAPI.addHD(hoaDon).then((res)=>{
      console.log("hóa đơn tạo",res.data);
      gioHangCT.map((ghct)=>{
        const id = uuid();
        console.log(res.data.hoaDon.id)
        const hdct={
          id:id,
          hoaDon:res.data.hoaDon.id,
          chiTietSanPham:ghct.chiTietSanPham,
          soLuong:ghct.soLuong,
          giaSauGiam:ghct.thanhTien
        };
        BanHangClientAPI.addHDCT(hdct).then((res)=>{
          console.log("hóa đơn chi tiết",res.data);
        });
        GioHangAPI.deleteGHCT(ghct.id);
        
      })
      loadGHCT();
    })
  }
  return (
    <div>
      <div className="banner-gio-hang-san-pham">
        <img src="https://d-themes.com/react/molla/demo-10/images/page-header-bg.jpg?fbclid=IwAR1a29UEcWcX-xX8mdyf6lSt9-lm8LB4tzbz4wscKg5yBPhlzyzWfIcjmF0"></img>
        <h1 className="text-center" style={{ marginTop: -130 }}>
          Giỏ hàng
        </h1>
      </div>
      <br></br> <br></br>
      <div className="row mt-5">
        {/* kẻ ngang */}
        <div className="xBNaac"></div>
        {khachHang != null ? (
          <div className="mt-4 row">
            {/* địa chỉ  */}
            <h5 style={{ color: "red" }}>
              <FaMapMarkerAlt size={25} className="text-danger" />
              <span className="ms-2"> Địa Chỉ Nhận Hàng</span>
            </h5>
            <div className="row mt-1">
              <h6 className="col-md-12">
                <b> Nguyễn Tùng Dương |09883537xx</b>
                <span style={{ marginLeft: 40 }}>
                  Số 16 ngõ 406 tổ dân phố 7, Phường Xuân Phương, Quận Nam Từ
                  Liêm, Hà Nội
                </span>
                <span style={{ marginLeft: 40 }}>
                  <Tag color="red">Mặc định</Tag>
                </span>
                <Button
                  style={{ marginLeft: 30 }}
                  onClick={() => setOpenModalDiaChi(true)}
                >
                  Thay đổi
                </Button>
              </h6>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="row mt-5">
        <div className="col-md-8">
          <table class="table mt-2">
            <thead>
              <tr>
                <th scope="col">Sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Tổng</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {gioHangCT.map((ghct, index) => {
                return (
                  <ProductRow key={index} product={ghct} loadghct={loadGHCT} />
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-md-4 donHangOL">
          <h4 className="text-center">Hóa đơn</h4>
          <hr
            style={{ height: 2, backgroundColor: "black", fontWeight: "bold" }}
          ></hr>
          <div
            className="row ps-2 pb-2"
            style={{ borderBottom: "1px dashed black" }}
          >
            <div className="col ps-4">
              <h6 style={{ marginTop: 4 }}>
                <BiSolidDiscount /> <span>Voucher</span> : Khuyến mãi 1
              </h6>
            </div>
            <div className="col">
              <a
                style={{
                  marginLeft: 80,
                  color: "blue",
                  fontWeight: "bold",
                }}
                className="cusor-pointer"
                onClick={() => setOpenModalVoucher(true)}
              >
                Chọn voucher
              </a>
            </div>
          </div>
          <div
            className="row ps-2 pb-2 mt-3"
            // style={{ borderBottom: "1px dashed black"}}
          >
            <div className="col-md-6" style={{ marginLeft: 30 }}>
              <span>Đơn hàng </span>
            </div>
            <div className="col-md-5">
              <span style={{ color: "blue" }}>
                {gioHangCT.map((gh) => {
                  total += Number(gh.thanhTien);
                  return null;
                })}
                {Intl.NumberFormat("en-US").format(total)}
              </span>{" "}
              <span>VND</span>
            </div>
          </div>
          <div
            className="row ps-2 pb-2 mt-3"
            style={{ borderBottom: "1px dashed black" }}
          >
            <div className="col-md-6" style={{ marginLeft: 30 }}>
              <span>Giảm </span>
            </div>
            <div className="col-md-5">
              <span style={{ color: "blue" }}>
                {Intl.NumberFormat("en-US").format(sale)}
              </span>{" "}
              <span>VND</span>
            </div>
          </div>
          <div
            className="row ps-2 pb-2 mt-3"
            // style={{ borderBottom: "1px dashed black" }}
          >
            <h5 className="col-md-6" style={{ marginLeft: 30 }}>
              <span>Tổng tiền </span>
            </h5>
            <h5 className="col-md-5">
              <span style={{ color: "blue" }}>
                {Intl.NumberFormat("en-US").format(total - sale)}{" "}
              </span>{" "}
              <span>VND</span>
            </h5>
          </div>
        </div>
      </div>
      <hr className="mt-5 mb-5"></hr>
      {/* giao hàng khi khách ko có tài khoản */}
      <div>
        {khachHang == null ? (
          <div className="row">
            <h5 className="text-danger col-md-2 ">Giao hàng</h5>
            <div className="col-md-2">
              <Switch
                onChange={() =>
                  setIsDiaChiGiaoHangVisible(!isDiaChiGiaoHangVisible)
                }
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className=" col-md-10 ms-5">
          {isDiaChiGiaoHangVisible && <DiaChiGiaoHang />}
        </div>
        {khachHang == null ? <hr className="mt-5 mb-5"></hr> : <></>}
      </div>
      {/* 
      Phương thức thanh toán */}
      <div className="row">
        <h5 className="col-md-3 d-flex align-items-center">
          Phương thức thanh toán
        </h5>
        <div className="col-md-8">
          <Button style={{ width: 300, height: 50 }}>
            Thanh toán khi nhận hàng
          </Button>
          <Button className="ms-4" style={{ width: 300, height: 50 }}>
            Thanh toán VNP
            <img
              className="ms-2"
              src={LogoVNP}
              style={{ width: 20, height: 20 }}
            ></img>
          </Button>
        </div>
      </div>
      <hr className="mt-5 mb-5"></hr>
      {/* Thông tin thanh toán */}
      <div className="row">
        <div className="col-md-7"></div>
        <div className="col-md-5 fw-bold">
          <div className="row">
            <h5 className="col">Tổng tiền</h5>
            <h5 className="col">
              : {Intl.NumberFormat("en-US").format(total - sale)} VND
            </h5>
          </div>
          <div className="row mt-3">
            <h5 className="col">Phí vận chuyển</h5>
            <h5 className="col">: 50.000 VND</h5>
          </div>
          <div className="row  mt-3">
            <h5 className="col">Mã Giảm giá</h5>
            <h5 className="col">
              :  {Intl.NumberFormat("en-US").format(sale)} VND
            </h5>
          </div>
          <div className="row mt-3" style={{ color: "red" }}>
            <h5 className="col">Tổng thanh toán</h5>
            <h5 className="col">: 5.000.000 VND</h5>
          </div>
          <hr className="mt-5 mb-5"></hr>
          <div className="d-flex flex-row-reverse bd-highlight">
            <Button
              className="p-2 bd-highlight"
              style={{
                width: 250,
                height: 60,
                backgroundColor: "orangered",
                color: "white",
              }}
              onClick={() => {
                handleMuaHang(total, sale, gioHangCT, khachHang);
              }}
            >
              Đặt hàng
            </Button>
          </div>
        </div>
      </div>
      <ModalDiaChi
        openModalDiaChi={openModalDiaChi}
        setOpenModalDiaChi={setOpenModalDiaChi}
        userID={userID}
      />
      <ModalVoucher
        openModalVoucher={openModalVoucher}
        setOpenModalVoucher={setOpenModalVoucher}
        userID={userID}
      />
    </div>
  );
};

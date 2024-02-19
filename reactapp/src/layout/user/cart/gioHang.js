import React, { useState, useEffect } from "react";
import "./gioHang.css";
import { Button, Tag } from "antd";
import { FaRegTrashAlt, FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";
import ModalDiaChi from "./modalDiaChi";
import ModalVoucher from "./modalVoucher";
import { Link } from "react-router-dom";
import ProductRow from "./gioHangrow";
import { get, set } from "local-storage";
export const GioHang = ({ children }) => {
  const [userID, setUserID] = useState("");
  const checkUser = () => {
    const storedData = get("userData");
    setUserID(storedData.userID)
  };

  console.log(userID)
  useEffect(() => {
    if (userID != null || userID != undefined || userID != "") {
      checkUser();
    }
  }, [userID]);

  const [openModalDiaChi, setOpenModalDiaChi] = useState(false);
  const [openModalVoucher, setOpenModalVoucher] = useState(false);
  const detailDiaChi = (row) => {
    console.log("click", row);
    // setIdKH(row);
    setOpenModalDiaChi(true);
  };
  // const [quantity, setQuantity] = useState(0);
  // const tangSL = () => {
  //   setQuantity(quantity + 1);
  // };

  // const giamSL = () => {
  //   if (quantity > 0) {
  //     setQuantity(quantity - 1);
  //   }
  // };
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
              <ProductRow />
              <ProductRow />
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
              <span style={{ color: "blue" }}>0 </span> <span>VND</span>
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
              <span style={{ color: "blue" }}>0 </span> <span>VND</span>
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
              <span style={{ color: "blue" }}>0 </span> <span>VND</span>
            </h5>
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

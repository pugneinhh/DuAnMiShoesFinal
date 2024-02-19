import React, { useEffect, useState } from "react";
import "./gioHang.css";
import { Button, Tag } from "antd";
import { FaRegTrashAlt, FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";
import ModalDiaChi from "./modalDiaChi";
import ModalVoucher from "./modalVoucher";
import { Link } from "react-router-dom";
import ProductRow from "./gioHangrow";
import { GioHangAPI } from "../../../pages/censor/api/gioHang/gioHang.api";
import { get, set } from "local-storage";
export const GioHang = ({ children }) => {
    const [openModalDiaChi, setOpenModalDiaChi] = useState(false);
    const [openModalVoucher, setOpenModalVoucher] = useState(false);
    const [khachHang,setKhachHang] = useState(null);
    const [gioHangCT,setGioHangCT] = useState([]);
    const storedData = get("userData");
    const storedGioHang = get("GioHang");

    useEffect(() => {
      if (storedData != null) {
        setKhachHang(storedData.userID);
      } 
      loadGHCT();
    }, []);
    const loadGHCT = () => {
     if(storedData !== null) {
      GioHangAPI.getByIDKH(storedData.userID).then((response) => {
        GioHangAPI.getAllGHCTByIDGH(response.data.id).then((res)=>{
          setGioHangCT(res.data);
          console.log("GioHangct",res.data);
        });
      });
     }
     if(storedGioHang !==null){
      GioHangAPI.getByID(storedGioHang.id).then((res)=>{
        GioHangAPI.getAllGHCTByIDGH(res.data.id).then((res)=>{
          setGioHangCT(res.data);
          console.log("GioHan",res.data);
        });
      });
     }
    };
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
              {gioHangCT.map((ghct,index)=>{
                return(<ProductRow key={index} product={ghct} loadghct={loadGHCT}/>)
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
      />
      <ModalVoucher
        openModalVoucher={openModalVoucher}
        setOpenModalVoucher={setOpenModalVoucher}
      />
    </div>
  );
};

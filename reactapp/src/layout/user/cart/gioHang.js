import React, { useEffect, useState, useRef } from "react";
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
import { SellAPI } from "../../../pages/censor/api/sell/sell.api";
import { KhachHangAPI } from "../../../pages/censor/api/user/khachHang.api";
import { ShipAPI } from "../../../pages/censor/api/ship/ship.api";
import { AdThongBaoDatHang, KHGuiThongBaoDatHang } from "../../../utils/socket/socket";
export const GioHang = ({ children }) => {
  const [openModalDiaChi, setOpenModalDiaChi] = useState(false);
  const [openModalVoucher, setOpenModalVoucher] = useState(false);
  const [khachHang, setKhachHang] = useState(null);
  const [gioHangCT, setGioHangCT] = useState([]);
  const [userID, setUserID] = useState("");
  const [hoaDonID, setHoaDonID] = useState("");
  const [voucher, setVoucher] = useState(null);
  const [diaChi, setDiaChi] = useState(null);
  const [clickCountTM, setClickCountTM] = useState(1);
  const [clickCountVNP, setClickCountVNP] = useState(0);
  const [phuongThuc, setPhuongThuc] = useState(0);
  const [discount, setDiscount] = useState(0);
  
  let total = 0;
  let tienShip=0;
  let thanhTien=0;
  const storedData = get("userData");
  const storedGioHang = get("GioHang");

  const getButtonTMType = () => {
    // Xác định loại button dựa trên giá trị biến đếm
    return clickCountTM % 2 === 0 ? "default" : "primary";
  };
  const getButtonVNPType = () => {
    // Xác định loại button dựa trên giá trị biến đếm
    return clickCountVNP % 2 === 0 ? "default" : "primary";
  };
  const handleClickButtonTM = () => {
    setClickCountTM((prevCount) => prevCount + 1);
    setClickCountVNP(0);
    setPhuongThuc(0);
  };
  const handleClickButtonVNP = () => {
    setClickCountVNP((prevCount) => prevCount + 1);
    setClickCountTM(0);
    setPhuongThuc(1);
  };
  useEffect(() => {
    if (storedData != null) {
      setKhachHang(storedData.userID);
      setUserID(storedData.userID);
      loadDiaChiMacDinh();
    }
    loadGHCT();
  }, []);
  const loadGiamGia=(voucher)=>{
    console.log("vsd",voucher)
    if(voucher!==null){
      if(voucher.loaiVoucher==='Tiền mặt'){
        setDiscount(voucher.giamToiDa);;
      }else{
        setDiscount(Math.min(total * (voucher.mucDo / 100), voucher.giamToiDa) );
      }
    }
    console.log("discount",discount)
  }
  const loadDiaChiMacDinh = () => {
    KhachHangAPI.getDiaChiMacDinh(storedData.userID).then((res) => {
      setDiaChi(res.data);
      console.log(res.data)
      console.log(ShipAPI.fetchAllDayShip(res.data.idHuyen, res.data.idXa).then(
        (res) => res.data.data
      )
     );
    });
    
  };
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
  
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSwitchTraSau, setIsSwitchTraSau] = useState(false);
  const [isDiaChiGiaoHangVisible, setIsDiaChiGiaoHangVisible] = useState(false);


  //mua hàng
  const handleMuaHang = (
    total,
    discount,
    gioHangCT,
    khachHang,
    voucher,
    diaChi,
    phuongThuc
  ) => {

    KHGuiThongBaoDatHang(); 
    const currentDate = new Date();
    const currentDateInMilliseconds = Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds(),
      currentDate.getMilliseconds(),
    );
    const idHD = uuid();
    let hoaDonID;
    const hoaDon = {
      id: idHD,
      ma: "HD" + currentDateInMilliseconds,
      nguoiDung: khachHang,
      giaGoc: total,
      giaGiamGia: discount,
      thanhTien: total - discount,
    };
    console.log("hóa đơn",hoaDon)
    BanHangClientAPI.addHD(hoaDon).then((res)=>{
      console.log("hóa đơn tạo",res.data);
        hoaDonID=res.data.id;
        console.log("giot hàng",gioHangCT);
      gioHangCT.map((ghct)=>{
        const id = uuid();
        console.log(hoaDonID)

        const hdct = {
          id: id,
          hoaDon: res.data.id,
          chiTietSanPham: ghct.chiTietSanPham,
          soLuong: ghct.soLuong,
          giaSauGiam: ghct.thanhTien,
        };
       
        
        BanHangClientAPI.addHDCT(hdct).then((res)=>{
          console.log("hóa đơn chi tiết",res.data);
        });
        GioHangAPI.deleteGHCT(ghct.id);

      });

    

    if (voucher !== null) {
      console.log("add voucher to hóa đơn",res.data.id,voucher.id)
      BanHangClientAPI.updateVoucherToHD(res.data.id,voucher.id)
    }
    
    const thanhToanTM={
      hoaDon:res.data.id,
      phuongThuc:phuongThuc,
      tienMat:total-discount,
      tongTien:total-discount,
    }
    
    
    if(phuongThuc==0){
      console.log("hóa đơn trước thanh toán",res.data.hoaDon);
      console.log("thanhToanTM",thanhToanTM)
      BanHangClientAPI.thanhToanTienMat(thanhToanTM).then((res)=>{
        console.log("hóa đơn tm",res.data);
      });
    }else{
      BanHangClientAPI.thanhToanHoaDon(hoaDonID).then((res)=>{
        console.log("thanh toán",res.data)
      });
      BanHangClientAPI.getLinkVnpay(res.data.id,total-discount).then((res) => {
        window.open(res.data.url, '_blank');
        console.log("url",res.data.url.substring(res.data.url.indexOf('vnp_TxnRef')+11).substring(0,8)); // mã giao dịch  
        console.log("dataa",res.data)
        const thanhToanVNP={
          hoaDon:hoaDonID,
          phuongThuc:phuongThuc,
          chuyenKhoan:total-discount,
          tongTien:total-discount,
          phuongThucVnp:res.data.url.substring(res.data.url.indexOf('vnp_TxnRef')+11).substring(0,8)
        }
        console.log("thanh toán vnp",thanhToanVNP)
       
        BanHangClientAPI.thanhToanChuyenKhoan(thanhToanVNP);
      });
    } 
   
    });
    
    loadGHCT();
    setVoucher(null);
    
  };

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
        {khachHang != null && diaChi != null ? (
          <div className="mt-4 row">
            {/* địa chỉ  */}
            <h5 style={{ color: "red" }}>
              <FaMapMarkerAlt size={25} className="text-danger" />
              <span className="ms-2"> Địa Chỉ Nhận Hàng</span>
            </h5>
            <div className="row mt-1">
              <h6 className="col-md-12">
                <b>
                  {" "}
                  {diaChi.tenNguoiNhan} | {diaChi.soDienThoai}
                </b>
                <span style={{ marginLeft: 40 }}>
                  {diaChi.diaChi}, {diaChi.tenXa}, {diaChi.tenHuyen},{" "}
                  {diaChi.tenThanhPho}
                </span>
                {diaChi.trangThai == 0 ? (
                  <span style={{ marginLeft: 40 }}>
                    <Tag color="red">Mặc định</Tag>
                  </span>
                ) : (
                  <></>
                )}

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
              {voucher !== null ? (
                <h6 style={{ marginTop: 4 }}>
                  <BiSolidDiscount /> <span>Voucher</span> : {voucher.ma}
                </h6>
              ) : (
                <h6 style={{ marginTop: 4 }}>
                  <BiSolidDiscount /> <span>Voucher</span> : Chọn voucher
                </h6>
              )}
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
             
                <span>
                  <span style={{ color: "blue" }} >
                    {Intl.NumberFormat("en-US").format(discount)}
                  </span>
                  <span> VND</span>
                </span>
              
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
                {Intl.NumberFormat("en-US").format(total-discount)} VND
                </span>
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
          <Button
            style={{ width: 300, height: 50 }}
            type={getButtonTMType()}
            onClick={handleClickButtonTM}
          >
            Thanh toán khi nhận hàng
          </Button>
          <Button
            className="ms-4"
            style={{ width: 300, height: 50 }}
            type={getButtonVNPType()}
            onClick={handleClickButtonVNP}
          >
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
              : {Intl.NumberFormat("en-US").format(total)} VND
            </h5>
          </div>
          <div className="row mt-3">
            <h5 className="col">Phí vận chuyển</h5>
            <h5 className="col">: {Intl.NumberFormat("en-US").format(tienShip)} VND</h5>
          </div>
          <div className="row  mt-3">
            <h5 className="col">Mã Giảm giá</h5>
            
              <h5 className="col">
                : {Intl.NumberFormat("en-US").format(discount)} VND
              </h5>
            
          </div>
          <div className="row mt-3" style={{ color: "red" }}>
            <h5 className="col">Tổng thanh toán</h5>
            <h5 className="col">: {Intl.NumberFormat("en-US").format(total+tienShip-discount)} VND</h5>
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
                handleMuaHang(
                  total,
                  discount,
                  gioHangCT,
                  khachHang,
                  voucher,
                  diaChi,
                  phuongThuc
                );
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
        loadDiaChiMacDinh={loadDiaChiMacDinh}
      />
      <ModalVoucher
        openModalVoucher={openModalVoucher}
        setOpenModalVoucher={setOpenModalVoucher}
        userID={userID}
        // hoaDonID={hoaDonID}
        voucherID={voucher}
        setVoucherID={setVoucher}
        total={total}
        loadGiamGia={loadGiamGia}
      />
    </div>
  );
};

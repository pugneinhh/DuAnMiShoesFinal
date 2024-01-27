import React, { useState } from "react";
import "./gioHang.css";
import { Button, Tag } from "antd";
import { FaRegTrashAlt, FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";
import ModalDiaChi from "./modalDiaChi";
import ModalVoucher from "./modalVoucher";
import { Link } from "react-router-dom";
export const GioHang = ({ children }) => {
    const [openModalDiaChi, setOpenModalDiaChi] = useState(false);
    const [openModalVoucher, setOpenModalVoucher] = useState(false);
      const detailDiaChi = (row) => {
        console.log("click", row);
        // setIdKH(row);
        setOpenModalDiaChi(true);
      };
  const [quantity, setQuantity] = useState(0);
  const tangSL = () => {
    setQuantity(quantity + 1);
  };

  const giamSL = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div>
      <div className="banner-gio-hang">
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
                style={{ marginLeft: 80 }}
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
              <tr>
                <td className="row">
                  <div className="col-md-3">
                    <img
                      style={{ width: 100, height: 100 }}
                      src="https://res-console.cloudinary.com/dm0w2qws8/thumbnails/v1/image/upload/v1705931217/eTN5eGM4bHdkdHZvYWZkZ21ucmE=/preview"
                    ></img>
                  </div>
                  <div className="col-md-5 fw-bold">
                    <h6> Nike Adidas Grand Court</h6>
                    <h6 className="mt-2"> 40</h6>
                    <div
                      className="mt-2"
                      style={{
                        backgroundColor: "red", //`${listSanPham.tenMauSac}`
                        borderRadius: 6,
                        width: 60,
                        height: 25,
                      }}
                    ></div>
                  </div>
                </td>
                <td>
                  <h6
                    className=" fw-bold"
                    style={{ color: "red", marginTop: "35px" }}
                  >
                    1.200.000
                  </h6>
                </td>
                <td>
                  <div style={{ marginTop: "30px" }}>
                    <button onClick={giamSL} style={{ width: 35 }}>
                      -
                    </button>
                    <input
                      value={quantity}
                      className="ms-2 me-2 text-center"
                      style={{ width: 35 }}
                      min={0}
                    ></input>
                    <button onClick={tangSL} style={{ width: 35 }}>
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <h6
                    className=" fw-bold"
                    style={{ color: "red", marginTop: "35px" }}
                  >
                    1.200.000
                  </h6>
                </td>
                <td>
                  <Button style={{ marginTop: "30px" }}>
                    <FaRegTrashAlt />
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="row">
                  <div className="col-md-3">
                    <img
                      style={{ width: 100, height: 100 }}
                      src="https://res-console.cloudinary.com/dm0w2qws8/thumbnails/v1/image/upload/v1705931217/eTN5eGM4bHdkdHZvYWZkZ21ucmE=/preview"
                    ></img>
                  </div>
                  <div className="col-md-5 fw-bold">
                    <h6> Nike Adidas Grand Court</h6>
                    <h6 className="mt-2"> 40</h6>
                    <div
                      className="mt-2"
                      style={{
                        backgroundColor: "red", //`${listSanPham.tenMauSac}`
                        borderRadius: 6,
                        width: 60,
                        height: 25,
                      }}
                    ></div>
                  </div>
                </td>
                <td>
                  <h6
                    className=" fw-bold"
                    style={{ color: "red", marginTop: "35px" }}
                  >
                    1.200.000
                  </h6>
                </td>
                <td>
                  <div style={{ marginTop: "30px" }}>
                    <button onClick={giamSL} style={{ width: 35 }}>
                      -
                    </button>
                    <input
                      value={quantity}
                      className="ms-2 me-2 text-center"
                      style={{ width: 35 }}
                      min={0}
                    ></input>
                    <button onClick={tangSL} style={{ width: 35 }}>
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <h6
                    className=" fw-bold"
                    style={{ color: "red", marginTop: "35px" }}
                  >
                    1.200.000
                  </h6>
                </td>
                <td>
                  <Button style={{ marginTop: "30px" }}>
                    <FaRegTrashAlt />
                  </Button>
                </td>
              </tr>
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
            <div className="col-md-7" style={{ marginLeft: 40 }}>
              <span>Đơn hàng </span>
            </div>
            <div className="col-md-4">
              <span style={{ color: "blue" }}>0 </span> <span>VND</span>
            </div>
          </div>
          <div
            className="row ps-2 pb-2 mt-3"
            style={{ borderBottom: "1px dashed black" }}
          >
            <div className="col-md-7" style={{ marginLeft: 40 }}>
              <span>Giảm </span>
            </div>
            <div className="col-md-4">
              <span style={{ color: "blue" }}>0 </span> <span>VND</span>
            </div>
          </div>
          <div
            className="row ps-2 pb-2 mt-3"
            // style={{ borderBottom: "1px dashed black" }}
          >
            <h5 className="col-md-7" style={{ marginLeft: 40 }}>
              <span>Tổng tiền </span>
            </h5>
            <h5 className="col-md-4">
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

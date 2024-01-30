import { Button, Modal, Image } from "antd";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SanPhamClientAPI } from "../../../pages/censor/api/home/sanPham/sanPham.api";
const ModalDetailSP = (props) => {
  const { openModalDetailSP, setOpenModalDetailSP, idCt, setidCTSP } = props;
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [largeImage, setLargeImage] = useState('');
      useEffect(() => {
       loadCTSP()
      }, []);
  const [ChiTietSanPham, setChiTietSanPham] = useState([]);
  const loadCTSP = () => {
    // console.log(result.data);
    SanPhamClientAPI.getCTSP(idCt).then((res) => {
      setChiTietSanPham(res.data);
      setLargeImage(res.data.anh);
      console.log(res.data);
     
    });
  };
  const handleImageClick = (url) => {
    setLargeImage(url);
  };
  const handleClose = () => {
    setOpenModalDetailSP(false);
    setidCTSP("");
  };
  console.log("idctsp là của tôi là",idCt);

  return (
    <Modal
      //   title="Voucher"
      centered
      open={openModalDetailSP}
      onOk={handleClose}
      onCancel={handleClose}
      width={1000}
    >
      <div className="row">
        <div className="col-md-6 justify-content-center align-items-center">
          <div>
            <Image
              style={{ width: 450, height: 450 }}
              src={largeImage}
              alt="Large Product"
            />
          </div>
          <div className="row mt-2">
            <div className="col-md-3">
              <img
                style={{ width: 90, height: 90, cursor: "pointer" }}
                src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369414/z5112244316883_4f6532ed804a61321b068673ee56a1e6_oitnz6.jpg"
                alt="Product 1"
                onClick={() =>
                  handleImageClick(
                    "https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369414/z5112244316883_4f6532ed804a61321b068673ee56a1e6_oitnz6.jpg"
                  )
                }
              />
            </div>
            <div className="col-md-3">
              <img
                style={{ width: 90, height: 90, cursor: "pointer" }}
                src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369415/z5112244321028_f6fcdc3c05a4e07141bdf44715b5b065_a0ygmi.jpg"
                alt="Product 2"
                onClick={() =>
                  handleImageClick(
                    "https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369415/z5112244321028_f6fcdc3c05a4e07141bdf44715b5b065_a0ygmi.jpg"
                  )
                }
              />
            </div>
            <div className="col-md-3">
              <img
                style={{ width: 90, height: 90, cursor: "pointer" }}
                src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369414/z5112244316883_4f6532ed804a61321b068673ee56a1e6_oitnz6.jpg"
                alt="Product 3"
                onClick={() =>
                  handleImageClick(
                    "https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369414/z5112244316883_4f6532ed804a61321b068673ee56a1e6_oitnz6.jpg"
                  )
                }
              />
            </div>
            <div className="col-md-3">
              <img
                style={{ width: 90, height: 90, cursor: "pointer" }}
                src="https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369415/z5112244321028_f6fcdc3c05a4e07141bdf44715b5b065_a0ygmi.jpg"
                alt="Product 4"
                onClick={() =>
                  handleImageClick(
                    "https://res.cloudinary.com/dm0w2qws8/image/upload/v1706369415/z5112244321028_f6fcdc3c05a4e07141bdf44715b5b065_a0ygmi.jpg"
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 ">
          {idCt}
          <h3>{ChiTietSanPham.tenSP}</h3>
          <h5 className="mb-4" style={{ color: "red" }}>
            {ChiTietSanPham.giaBan}
            <span>VND</span>
          </h5>
          <hr></hr>
          <h6>Màu</h6>
          <div className="row">
            <div className="col-md-1">
              <Button
                className="mt-2 "
                style={{
                  backgroundColor: "red", //`${listSanPham.tenMauSac}`
                  borderRadius: 20,
                  width: 30,
                  height: 30,
                }}
              ></Button>
            </div>
            <div className="col-md-1">
              <Button
                className="mt-2 "
                style={{
                  backgroundColor: "black", //`${listSanPham.tenMauSac}`
                  borderRadius: 20,
                  width: 30,
                  height: 30,
                }}
              ></Button>
            </div>
            <div className="col-md-1">
              <Button
                className="mt-2 "
                ghost
                style={{
                  backgroundColor: "pink", //`${listSanPham.tenMauSac}`
                  borderRadius: 20,
                  width: 30,
                  height: 30,
                }}
              ></Button>
            </div>
          </div>
          <hr></hr>
          <h6>Size</h6>
          <div className="row mt-2">
            <div className="col-md-1 me-2">
              <Button
                className=" mt-2  "
                style={{
                  borderRadius: 10,
                  width: 40,
                  height: 40,
                }}
              >
                38
              </Button>
            </div>
            <div className="col-md-1 me-2">
              <Button
                className=" mt-2  "
                style={{
                  borderRadius: 10,
                  width: 40,
                  height: 40,
                }}
              >
                39
              </Button>
            </div>
            <div className="col-md-1 me-2">
              <Button
                className=" mt-2  "
                style={{
                  borderRadius: 10,
                  width: 40,
                  height: 40,
                }}
              >
                40
              </Button>
            </div>
          </div>
          <hr></hr>
          <h5>Mô tả sản phẩm:</h5>
          <p>
            <p>
              ●<span className="me-2"></span>Tên hãng:{" "}
              <span>{ChiTietSanPham.tenHang}</span>
            </p>
            <p>
              ●<span className="me-2"></span>Độ cao :{" "}
              <span>{ChiTietSanPham.tenDeGiay} cm </span>
            </p>
            <p>
              ●<span className="me-2"></span>Danh mục:{" "}
              <span>{ChiTietSanPham.tenDM}</span>
            </p>
            <p>
              ●<span className="me-2"></span>Chất liệu:{" "}
              <span>{ChiTietSanPham.tenCL}</span>
            </p>
            {ChiTietSanPham.moTa}
          </p>
        </div>
      </div>
    </Modal>
  );
};
export default ModalDetailSP;

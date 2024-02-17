import { Button, Modal, Image, InputNumber } from "antd";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SanPhamClientAPI } from "../../../pages/censor/api/home/sanPham/sanPham.api";
const ModalDetailSP = (props) => {
  const { openModalDetailSP, setOpenModalDetailSP, idCt, setidCTSP } = props;
  const [largeImage, setLargeImage] = useState('');

  const [ChiTietSanPham, setChiTietSanPham] = useState([]);
  const [selectedMauSac, setSelectedMauSac] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [IDSanPham, setIDSanPham] = useState('');
  const [IDMauSac, setIDMauSac] = useState('');
  const [IDSize, setIDSize] = useState('');
  useEffect(() => {
   loadCTSP();
  }, [])
  const loadCTSP = () => {
    SanPhamClientAPI.getCTSP(idCt).then((res) => {
      setChiTietSanPham(res.data);
      console.log("list sp",res.data);
      setIDSanPham(res.data.sanPhamID);
      setSelectedMauSac(res.data.mauSacID);
      setIDMauSac(res.data.mauSacID);
      setSelectedSize(res.data.kichThuocID);
      setIDSize(res.data.kichThuocID);
      loadListMauSacBySP(res.data.sanPhamID);
      loadListSizeBySP(res.data.sanPhamID);
      setLargeImage(res.data.anh);
    });
  };
  const loadCTSPChange = () => {
    console.log("ídap",IDSanPham,'idms',IDMauSac,'idSize',IDSize);
    SanPhamClientAPI.getCTSPChange(IDSanPham,IDMauSac,IDSize).then((res) => {
      // setChiTietSanPham(res.data);
      console.log("list sp change",res.data);
      setIDSanPham(res.data.sanPhamID);
      setIDMauSac(res.data.mauSacID);
      setIDSize(res.data.kichThuocID);
      // setLargeImage(res.data.anh);
    });
  };
   const [ListMauSacBySP, setListMauSacBySP] = useState([]);
    const loadListMauSacBySP = (IDSP) => {
      SanPhamClientAPI.getListMauSacBySP(IDSP).then((res) => {
     setListMauSacBySP(res.data);
      });
    };
       const [ListSizeBySP, setListSizeBySP] = useState([]);
       const loadListSizeBySP = (IDSP) => {
         SanPhamClientAPI.getListSizeBySP(IDSP).then((res) => {
           setListSizeBySP(res.data);
         });
       };
      
  const handleImageClick = (url) => {
    setLargeImage(url);
  };
  const handleClose = () => {
    setOpenModalDetailSP(false);
    setidCTSP("");
  };


  const handleMauSacClick = (mauSacId) => {
    // Update the selected color when a button is clicked
    setIDMauSac(mauSacId);
    setSelectedMauSac(mauSacId);
    // window.location.href = `/client/sanpham/kich-thuoc-sp/${IDSanPham}/${mauSacId}`;
     SanPhamClientAPI.changeListSizeBySPandMS(IDSanPham,mauSacId).then((res) => {
       setListSizeBySP(res.data);
     });
    loadCTSPChange();
    console.log("id ms ne", IDMauSac );
    console.log("id ms ne", IDSanPham);
  };

  const handleSizeClick = (sizeId) => {
    // Update the selected size when a button is clicked
    setIDSize(sizeId);
    setSelectedSize(sizeId);
    loadCTSPChange();
  };




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
          <h5 className="mb-3" style={{ color: "red" }}>
            {Intl.NumberFormat("en-US").format(ChiTietSanPham.giaBan)}

            <span>VND</span>
          </h5>
          <hr></hr>
          <h6>Màu</h6>

          <div className="row">
            {ListMauSacBySP.map((listMauSacBySP, index) => (
              <div className="col-md-1" key={index}>
                <Button
                  className={`mt-1 `}
                  style={{
                    backgroundColor: listMauSacBySP.maMau, //`${listSanPham.tenMauSac}`
                    borderRadius: 20,
                    width: 30,
                    height: 30,
                    border: selectedMauSac === listMauSacBySP.mauSacID ? '1px solid #4096ff' : 'none',
                  }}
                   onClick={() => handleMauSacClick(listMauSacBySP.mauSacID)}
                ></Button>
              </div>
            ))}
          </div>
          <hr></hr>
          <h6>Size</h6>
          <div className="row mt-1">
          {ListSizeBySP.map((listsize, index) => (
            <div className="col-md-1 me-2" key={index}>
              <Button
                className={`mt-2`}
                style={{
                  borderRadius: 10,
                  width: 40,
                  height: 40,
                  textAlign: 'center',
                  border: selectedSize === listsize.kichThuocID ? '1px solid #4096ff' : '1px solid #d9d9d9',
                }}
                onClick={() => handleSizeClick(listsize.kichThuocID)}
              >
                {listsize.tenKichThuoc}
              </Button>
            </div>
  ))}
          </div>
          <h6 className="mt-3">Số lượng</h6>
          <div className="row">
            <div className="col">
              <InputNumber
                min={1}
                max={ChiTietSanPham.soLuong}
                defaultValue={0}
              />
            </div>
            <div className="col">{ChiTietSanPham.soLuong} sản phẩm có sẵn</div>
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

import { Button, Modal, Image, InputNumber } from "antd";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SanPhamClientAPI } from "../../../pages/censor/api/home/sanPham/sanPham.api";
import { GioHangAPI } from "../../../pages/censor/api/gioHang/gioHang.api";
import { get, set } from "local-storage";
const ModalDetailSP = (props) => {
  const { openModalDetailSP, setOpenModalDetailSP, idCt, setidCTSP } = props;
  const [largeImage, setLargeImage] = useState("");
  const [ChiTietSanPham, setChiTietSanPham] = useState([]);
  const [selectedMauSac, setSelectedMauSac] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [IDSanPham, setIDSanPham] = useState("");
  const [IDMauSac, setIDMauSac] = useState("");
  const [IDSize, setIDSize] = useState("");
  const [soLuong, setSoLuong] = useState(1);
  const [khachHang, setKhachHang] = useState(null);
  const storedData = get("userData");
  const storedGioHang = get("GioHang");
  console.log("IDCTSP",idCt);
  useEffect(() => {
    loadCTSP();
    if (storedData != null) {
      setKhachHang(storedData.userID);
    } 
  }, []);
  const loadCTSP = () => {
    SanPhamClientAPI.getCTSP(idCt).then((res) => {
      setChiTietSanPham(res.data);
      setIDSanPham(res.data.sanPhamID);
      setSelectedMauSac(res.data.mauSacID);
      setIDMauSac(res.data.mauSacID);
      setSelectedSize(res.data.kichThuocID);
      setIDSize(res.data.kichThuocID);
      loadListMauSacBySP(res.data.sanPhamID);
      SanPhamClientAPI.changeListSizeBySPandMS(res.data.sanPhamID, res.data.mauSacID).then(
        (res) => {
          setListSizeBySP(res.data);
          const kichThuocExists = res.data.some(
            (item) => item.kichThuocID === selectedSize
          );
          if (kichThuocExists) {
            setSelectedSize(selectedSize);
          } else {
            setSelectedSize(res.data[0].kichThuocID);
          }
        }
      );
      setLargeImage(res.data.anh);
    });
  };
  const loadCTSPChange = (idSP, mauSelect, sizeSelect) => {
    SanPhamClientAPI.getCTSPChange(idSP, mauSelect, sizeSelect).then((res) => {
      setChiTietSanPham(res.data);
      console.log("list sp change", res.data);
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

  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false); // Đánh dấu đã render lần đầu
    } else {
      loadCTSPChange(IDSanPham, selectedMauSac, selectedSize);
    }
  }, [selectedMauSac, selectedSize]);

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
    SanPhamClientAPI.changeListSizeBySPandMS(IDSanPham, mauSacId).then(
      (res) => {
        setListSizeBySP(res.data);
        const kichThuocExists = res.data.some(
          (item) => item.kichThuocID === selectedSize
        );
        if (kichThuocExists) {
          setSelectedSize(selectedSize);
        } else {
          setSelectedSize(res.data[0].kichThuocID);
        }
      }
    );
  };

  const handleSizeClick = (sizeId) => {
    setIDSize(sizeId);
    setSelectedSize(sizeId);
  };
  const handleAddGioHang = (ChiTietSanPham, soLuong, khachHang) => {
    let randomString = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    if (storedGioHang === null) {
      if(khachHang!==null){
        GioHangAPI.getByIDKH(khachHang).then((res)=>{
          
          if(res.data!==null&&res.data!==''){//nếu như tồn tại giỏ hàng của khách đăng nhập thì kiểm tra xem sp có trùng vs sp trong ghct đó k
            console.log("res.data",res.data);
            
            const idgh=res.data.id;
            
            GioHangAPI.getAllGHCTByIDGH(res.data.id).then((res) => {
              const idCTSP = res.data.filter((item) => item.chiTietSanPham === ChiTietSanPham.id);
              if (idCTSP.length > 0) {
                const GHCT = {
                  id:idCTSP[0].id,
                  gioHang: idCTSP[0].gioHang,
                  chiTietSanPham: ChiTietSanPham.id,
                  soLuong: soLuong,
                  thanhTien: ChiTietSanPham.giaBan * soLuong,
                };
                 
                GioHangAPI.updateSLGHCT(GHCT).then((res)=>{
                  toast("✔️ Thêm thành công!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                })
              }else{
                const data = {
                  gioHang:idgh,
                  chiTietSanPham: ChiTietSanPham.id,
                  soLuong: soLuong,
                  thanhTien: ChiTietSanPham.giaBan * soLuong,
                };
               
                GioHangAPI.addGHCT(data).then((res) => {
                  toast("✔️ Thêm thành công!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                });
              }
            });
          }else{
            GioHangAPI.addGH({ ma: randomString, khachHang: khachHang }).then(
              (res) => {
                // set("GioHang", res.data);
                const data = {
                  gioHang: res.data.id,
                  chiTietSanPham: ChiTietSanPham.id,
                  soLuong: soLuong,
                  thanhTien: ChiTietSanPham.giaBan * soLuong,
                };
                if (soLuong > ChiTietSanPham.soLuong) {
                  toast.error("Số lượng sản phẩm không đủ!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                } else {
                  GioHangAPI.addGHCT(data).then((res) => {
                    toast("✔️ Thêm thành công!", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  
                  });
                }
              }
            );
          }
        })
      }else{
      
      GioHangAPI.addGH({ ma: randomString, khachHang: khachHang }).then(
        (res) => {
          set("GioHang", res.data);
          const data = {
            gioHang: res.data.id,
            chiTietSanPham: ChiTietSanPham.id,
            soLuong: soLuong,
            thanhTien: ChiTietSanPham.giaBan * soLuong,
          };
          if (soLuong > ChiTietSanPham.soLuong) {
            toast.error("Số lượng sản phẩm không đủ!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            GioHangAPI.addGHCT(data).then((res) => {
              toast("✔️ Thêm thành công!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            
            });
          }
        }
      );
    }
    } else {
      GioHangAPI.getAllGHCTByIDGH(storedGioHang.id).then((res) => {
        const idCTSP = res.data.filter((item) => item.chiTietSanPham === ChiTietSanPham.id);
       
        if (idCTSP.length > 0) {
          const GHCT = {
            id:idCTSP[0].id,
            gioHang: res.data[0].gioHang,
            chiTietSanPham: ChiTietSanPham.id,
            soLuong: soLuong,
            thanhTien: ChiTietSanPham.giaBan * soLuong,
          };
           
          GioHangAPI.updateSLGHCT(GHCT).then((res)=>{
            toast("✔️ Thêm thành công!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
        }else{
          const data = {
            gioHang: res.data[0].gioHang,
            chiTietSanPham: ChiTietSanPham.id,
            soLuong: soLuong,
            thanhTien: ChiTietSanPham.giaBan * soLuong,
          };
          GioHangAPI.addGHCT(data).then((res) => {
            toast("✔️ Thêm thành công!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
        }
      });
    }
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
          <h3>{ChiTietSanPham.tenSP}</h3>
          <h5 className="mb-3" style={{ color: "red" }}>
            { 
            ChiTietSanPham.loaiKM ?
            (
            <span>
            <del style={{color:"black"}}>{Intl.NumberFormat("en-US").format(ChiTietSanPham.giaBan)} VNĐ     </del>
            
            {Intl.NumberFormat("en-US").format(ChiTietSanPham.loaiKM === "Tiền mặt" ? ChiTietSanPham.giaBan - ChiTietSanPham.giaTriKhuyenMai : ChiTietSanPham.giaBan - (ChiTietSanPham.giaBan*ChiTietSanPham.giaTriKhuyenMai/100))} VNĐ
            </span>
            )
            : 
            (<span style={{color:"black"}}>{Intl.NumberFormat("en-US").format(ChiTietSanPham.giaBan)} VNĐ</span>)

            }
            
            
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
                    border:
                      selectedMauSac === listMauSacBySP.mauSacID
                        ? "1px solid #4096ff"
                        : "none",
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
                    textAlign: "center",
                    border:
                      selectedSize === listsize.kichThuocID
                        ? "1px solid #4096ff"
                        : "1px solid #d9d9d9",
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
                value={soLuong}
                onChange={(value) => setSoLuong(value)}
              />
            </div>
            <div className="col">{ChiTietSanPham.soLuong} sản phẩm có sẵn</div>
          </div>
          <Button
            className={`mt-3`}
            type="primary"
            onClick={() => handleAddGioHang(ChiTietSanPham, soLuong, khachHang)}
          >
            Thêm vào giỏ hàng
          </Button>
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
      {/* Same as */}
      <ToastContainer />
    </Modal>
  );
};
export default ModalDetailSP;

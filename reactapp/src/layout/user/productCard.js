import React, { useEffect, useState } from "react";
import { Button } from "antd";
import "./productCard.css";
import { FaShoppingCart } from "react-icons/fa";
import ModalDetailSP from "./shop/modalDetailSP";
import { GioHangAPI } from "../../pages/censor/api/gioHang/gioHang.api";
import { get, set } from "local-storage";
import { useCart } from "./cart/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openModalDetailSP, setOpenModalDetailSP] = useState(false);
  const [khachHang, setKhachHang] = useState(null);
  const storedData = get("userData");
  const storedGioHang = get("GioHang");
  const { updateTotalQuantity } = useCart();
  const nav = useNavigate();

  const loadCountGioHang = () => {
    if (storedData != null) {
      GioHangAPI.getByIDKH(storedData.userID).then((res) => {
        GioHangAPI.getAllGHCTByIDGH(res.data.id).then((res) => {
          updateTotalQuantity(res.data.length);
        });
      });
    } else {
      GioHangAPI.getAllGHCTByIDGH(storedGioHang.id).then((res) => {
        updateTotalQuantity(res.data.length);
      });
    }
  };

  useEffect(() => {
    if (storedData!=null) {
      setKhachHang(storedData.userID);
    }
    
    // loadVoucherTotNhatVaVoucherTiepTheo();
  }, []);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const [idCt, setidCTSP] = useState("");
  const detailCTSP = (row) => {
    setidCTSP(row);
    setOpenModalDetailSP(true);
  };

  const handleAddGioHang = (ChiTietSanPham, soLuong, khachHang) => {
    
    let randomString = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    if (storedGioHang === null) {
      if (khachHang !== null) {
        GioHangAPI.getByIDKH(khachHang).then((res) => {
          if (res.data !== null && res.data !== "") {
            //nếu như tồn tại giỏ hàng của khách đăng nhập thì kiểm tra xem sp có trùng vs sp trong ghct đó k


            const idgh = res.data.id;

            GioHangAPI.getAllGHCTByIDGH(res.data.id).then((res) => {
              const idCTSP = res.data.filter(
                (item) => item.chiTietSanPham === ChiTietSanPham.idCt
              );
              if (idCTSP.length > 0) {
                const GHCT = {
                  id: idCTSP[0].id,
                  gioHang: idCTSP[0].gioHang,
                  chiTietSanPham: ChiTietSanPham.idCt,
                  soLuong: soLuong,
                  thanhTien: ChiTietSanPham.loaiKM
                    ? ChiTietSanPham.loaiKM === "Tiền mặt"
                      ? (ChiTietSanPham.price -
                        ChiTietSanPham.giaTriKhuyenMai) *
                      soLuong
                      : (ChiTietSanPham.price -
                        (ChiTietSanPham.price *
                          ChiTietSanPham.giaTriKhuyenMai) /
                        100) *
                      soLuong
                    : ChiTietSanPham.price * soLuong,
                };

                GioHangAPI.updateSLGHCT(GHCT).then((res) => {
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
                  loadCountGioHang();
                  nav("/gio-hang");
                });
              } else {
                const data = {
                  gioHang: idgh,
                  chiTietSanPham: ChiTietSanPham.idCt,
                  soLuong: soLuong,
                  thanhTien: ChiTietSanPham.loaiKM
                    ? ChiTietSanPham.loaiKM === "Tiền mặt"
                      ? (ChiTietSanPham.price -
                        ChiTietSanPham.giaTriKhuyenMai) *
                      soLuong
                      : (ChiTietSanPham.price -
                        (ChiTietSanPham.price *
                          ChiTietSanPham.giaTriKhuyenMai) /
                        100) *
                      soLuong
                    : ChiTietSanPham.price * soLuong,
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
                  loadCountGioHang();
                  nav("/gio-hang");
                });
              }
            });
          } else {
            GioHangAPI.addGH({ ma: randomString, khachHang: khachHang }).then(
              (res) => {
                // set("GioHang", res.data);
                const data = {
                  gioHang: res.data.id,
                  chiTietSanPham: ChiTietSanPham.idCt,
                  soLuong: soLuong,
                  thanhTien: ChiTietSanPham.loaiKM
                    ? ChiTietSanPham.loaiKM === "Tiền mặt"
                      ? (ChiTietSanPham.price -
                        ChiTietSanPham.giaTriKhuyenMai) *
                      soLuong
                      : (ChiTietSanPham.price -
                        (ChiTietSanPham.price *
                          ChiTietSanPham.giaTriKhuyenMai) /
                        100) *
                      soLuong
                    : ChiTietSanPham.price * soLuong,
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
                    loadCountGioHang();
                    nav("/gio-hang");
                  });
                }
              }
            );
          }
        });
      } else {
        GioHangAPI.addGH({ ma: randomString, khachHang: khachHang }).then(
          (res) => {
            set("GioHang", res.data);
            const data = {
              gioHang: res.data.id,
              chiTietSanPham: ChiTietSanPham.idCt,
              soLuong: soLuong,
              thanhTien: ChiTietSanPham.loaiKM
                ? ChiTietSanPham.loaiKM === "Tiền mặt"
                  ? (ChiTietSanPham.price - ChiTietSanPham.giaTriKhuyenMai) *
                  soLuong
                  : (ChiTietSanPham.price -
                    (ChiTietSanPham.price * ChiTietSanPham.giaTriKhuyenMai) /
                    100) *
                  soLuong
                : ChiTietSanPham.price * soLuong,
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
                loadCountGioHang();
                nav("/gio-hang");
              });
            }
          }
        );
      }
    } else {
      GioHangAPI.getAllGHCTByIDGH(storedGioHang.id).then((res) => {
        const idCTSP = res.data.filter(
          (item) => item.chiTietSanPham === ChiTietSanPham.idCt
        );

        if (idCTSP.length > 0) {
          const GHCT = {
            id: idCTSP[0].id,
            gioHang: res.data[0].gioHang,
            chiTietSanPham: ChiTietSanPham.idCt,
            soLuong: soLuong,
            thanhTien: ChiTietSanPham.loaiKM
              ? ChiTietSanPham.loaiKM === "Tiền mặt"
                ? (ChiTietSanPham.price - ChiTietSanPham.giaTriKhuyenMai) *
                soLuong
                : (ChiTietSanPham.price -
                  (ChiTietSanPham.price * ChiTietSanPham.giaTriKhuyenMai) /
                  100) *
                soLuong
              : ChiTietSanPham.price * soLuong,
          };

          GioHangAPI.updateSLGHCT(GHCT).then((res) => {
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
            loadCountGioHang();
            nav("/gio-hang");
          });
        } else {
          const data = {
            gioHang: storedGioHang.id,
            chiTietSanPham: ChiTietSanPham.idCt,
            soLuong: soLuong,
            thanhTien: ChiTietSanPham.loaiKM
              ? ChiTietSanPham.loaiKM === "Tiền mặt"
                ? (ChiTietSanPham.price - ChiTietSanPham.giaTriKhuyenMai) *
                soLuong
                : (ChiTietSanPham.price -
                  (ChiTietSanPham.price * ChiTietSanPham.giaTriKhuyenMai) /
                  100) *
                soLuong
              : ChiTietSanPham.price * soLuong,
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
            loadCountGioHang();
            nav("/gio-hang");
          });
        }
      });
    }
  };

  return (
    <div class="container-card-sanpham">
      <div class="card">
        {product.loaiKM && (
          <div class={product.loaiKM === "Phần trăm" ? "ribbon" : "ribbon2"}>
            {/* Big sale off */}
            {product.loaiKM === "Phần trăm"
              ? +" " + product.giaTriKhuyenMai + "%"
              : Intl.NumberFormat("en-US").format(
                  roundToThousands(product.giaTriKhuyenMai)
                ) + " VND"}
          </div>
        )}
        <div class="imgBx">
          <img
            src={isHovered ? product.hoverImage : product.image}
            alt={product.name}
            className="product-image"
          />
          {/* <img src={product.name} /> */}
        </div>
        <div class="contentBx">
          <h3 className="card-tilte-san-pham">
            {product.name}-[{product.size}-{product.color}]
          </h3>
          <div class="size" style={{ marginTop: -10 }}>
            <span>{product.size}</span>
          </div>
          <div class="color mt-2">
            <Button
              shape="circle"
              className="btn btn-sm border border-dark"
              style={{ backgroundColor: product.colorCode }}
            />
          </div>
          <div className="">
            {product.loaiKM ? (
              <span>
                <span className="text-gia-tien ">
                  <del style={{ color: "red" }}>
                    {Intl.NumberFormat("en-US").format(
                      roundToThousands(product.price)
                    )}{" "}
                    VND
                  </del>
                </span>
                <span className="text-gia-tien ">
                  {Intl.NumberFormat("en-US").format(
                    roundToThousands(
                      product.loaiKM === "Tiền mặt"
                        ? product.price - product.giaTriKhuyenMai
                        : product.price -
                            (product.price * product.giaTriKhuyenMai) / 100
                    )
                  )}{" "}
                  VND
                </span>
              </span>
            ) : (
              <span className="text-gia-tien">
                {Intl.NumberFormat("en-US").format(
                  roundToThousands(product.price)
                )}{" "}
                VND
              </span>
            )}
          </div>
          {/* <div className="buttons-container">
            <a href="#" className="buy-button">
              <FaShoppingCart size={20} className="icon" /> Buy Now
            </a>
            <button
              className="details-button"
              onClick={() => detailCTSP(product.idCt)}
            >
              <IoIosInformationCircle size={20} className="icon" />
              Details
            </button>
            {idCt && (
              <ModalDetailSP
                openModalDetailSP={openModalDetailSP}
                setOpenModalDetailSP={setOpenModalDetailSP}
                idCt={idCt}
                setidCTSP={setidCTSP}
              />
            )}
          </div> */}

          <button href="#" className="button-35" onClick={()=>handleAddGioHang(product,1,khachHang)}>
            <FaShoppingCart size={20} className="icon" /> Mua ngay
          </button>
          {/* <a
            class="button-36"
            role="button"
            onClick={() => detailCTSP(product.idCt)}
          >
            <span class="text">
              {" "}
              <IoIosInformationCircle size={20} className="icon" />
              Details
            </span>
          </a> */}
          <button class="button-36" onClick={() => detailCTSP(product.idCt)}>
            <span class="text">Xem chi tiết</span>
          </button>

          {idCt && (
            <ModalDetailSP
              openModalDetailSP={openModalDetailSP}
              setOpenModalDetailSP={setOpenModalDetailSP}
              idCt={idCt}
              setidCTSP={setidCTSP}
            />
          )}
        </div>
      </div>
    </div>
  );
};
function roundToThousands(amount) {
  return Math.round(amount / 100) * 100;
}
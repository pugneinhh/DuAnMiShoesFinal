import React, { useState } from "react";
import { Button } from "antd";
import "./productCard.css";
import { IoIosInformationCircle } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import ModalDetailSP from "./shop/modalDetailSP";
export const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openModalDetailSP, setOpenModalDetailSP] = useState(false);
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
  return (
    // <div
    //   className="product-card col-sm-3 m-3"
    //   onMouseEnter={handleMouseEnter}
    //   onMouseLeave={handleMouseLeave}
    // >
    //   <img
    //     src={isHovered ? product.hoverImage : product.image}
    //     alt={product.name}
    //     className="product-image"
    //   />
    //   <div className="product-details">
    //     <div className="product-name text-center">
    //       <h6>
    //         {product.name} [{product.size}-{product.color}]
    //       </h6>
    //       <br></br>

    //     </div>
    //     <div className="text-center">
    //       <Button
    //         shape="circle"
    //         className="btn btn-sm border border-dark"
    //         style={{ backgroundColor: product.colorCode }}
    //       />
    //     </div>
    // <div className="product-price text-center text-danger">
    //    {
    //    product.loaiKM ?
    //   (<span><del style={{color:"black"}}>{Intl.NumberFormat("en-US").format(product.price)} VNĐ</del>
    //   <br/>
    //   {Intl.NumberFormat("en-US").format(product.loaiKM === "Tiền mặt" ? product.price - product.giaTriKhuyenMai : product.price - (product.price*product.giaTriKhuyenMai/100))} VNĐ</span>)
    //   :   (<span>{Intl.NumberFormat("en-US").format(product.price)} VNĐ</span>)

    //    }
    // </div>
    //   </div>
    //   <div className="buttons-container">
    //     <a href="#" className="buy-button">
    //       <FaShoppingCart size={20} className="icon" /> Buy Now
    //     </a>
    //     <button
    //       className="details-button"
    //       onClick={() => detailCTSP(product.idCt)}
    //     >
    //       <IoIosInformationCircle size={20} className="icon" />
    //       Details
    //     </button>
    //     {idCt && (
    //       <ModalDetailSP
    //         openModalDetailSP={openModalDetailSP}
    //         setOpenModalDetailSP={setOpenModalDetailSP}
    //         idCt={idCt}
    //         setidCTSP={setidCTSP}
    //       />
    //     )}
    //   </div>

    // </div>
    <div class="container-card-sanpham">
      <div class="card">
        {product.loaiKM && (
          <div class="ribbon ">
            Big sale off
            {/* {product.loaiKM === "Tiền mặt"
              ? product.giaTriKhuyenMai
              : product.giaTriKhuyenMai + "%"} */}
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
                    {Intl.NumberFormat("en-US").format(product.price)} VNĐ
                  </del>
                </span>
                <span className="text-gia-tien ">
                  {Intl.NumberFormat("en-US").format(
                    product.loaiKM === "Tiền mặt"
                      ? product.price - product.giaTriKhuyenMai
                      : product.price -
                          (product.price * product.giaTriKhuyenMai) / 100
                  )}{" "}
                  VNĐ
                </span>
              </span>
            ) : (
              <span className="text-gia-tien">
                {Intl.NumberFormat("en-US").format(product.price)} VNĐ
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

          <button href="#" className="button-35">
            <FaShoppingCart size={20} className="icon" /> Buy Now
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

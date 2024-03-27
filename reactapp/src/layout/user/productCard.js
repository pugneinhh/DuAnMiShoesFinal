import React, { useState } from 'react';
import { Button } from 'antd';
import "./productCard.css";
import { IoIosInformationCircle } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
import ModalDetailSP from './shop/modalDetailSP';
export const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
    const [openModalDetailSP, setOpenModalDetailSP] =useState(false);
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
    <div
      className="product-card col-sm-3 m-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={isHovered ? product.hoverImage : product.image}
        alt={product.name}
        className="product-image"
      />
      <div className="product-details">
        <div className="product-name text-center">
          <h6>
            {product.name} [{product.size}-{product.color}]
          </h6>
          <br></br>
          
        </div>
        <div className="text-center">
          <Button
            shape="circle"
            className="btn btn-sm border border-dark"
            style={{ backgroundColor: product.colorCode }}
          />
        </div>
        <div className="product-price text-center text-danger">
           {
           product.loaiKM ? 
          (<span><del style={{color:"black"}}>{Intl.NumberFormat("en-US").format(product.price)} VNĐ</del>
          <br/>
          {Intl.NumberFormat("en-US").format(product.loaiKM === "Tiền mặt" ? product.price - product.giaTriKhuyenMai : product.price - (product.price*product.giaTriKhuyenMai/100))} VNĐ</span>)
          :   (<span>{Intl.NumberFormat("en-US").format(product.price)} VNĐ</span>)
          
           }
        </div>
      </div>
      <div className="buttons-container">
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
      </div>
    </div>
  );
};
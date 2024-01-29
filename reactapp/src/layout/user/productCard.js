import React, { useState } from 'react';
import { Button } from 'antd';
import "./productCard.css";
import { IoIosInformationCircle } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
export const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
        <div className="product-name"><h7>{product.name} [{product.size}-{product.color}]</h7></div>
        <div><Button shape="circle" className='btn btn-sm border border-dark' style={{backgroundColor: product.colorCode}}/></div>
        <div className="product-price">{Intl.NumberFormat('en-US').format(product.price)} VNĐ</div>
      </div>
      <div className="buttons-container">
        <a href="#" className="buy-button">
           <FaShoppingCart size={20} className='icon'/> Buy Now
        </a>
        <a href="#" className="details-button">
          <IoIosInformationCircle size={20} className='icon'/> Details
        </a>
      </div>
    </div>
  );
};
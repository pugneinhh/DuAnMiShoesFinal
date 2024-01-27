import React, { useState } from 'react';
import "./productCard.css";
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
        <div className="product-name">{product.name}</div>
        <div className="product-price">{product.price}</div>
      </div>
      <div className="buttons-container">
        <a href="#" className="buy-button">
          Buy Now
        </a>
        <a href="#" className="details-button">
          Details
        </a>
      </div>
    </div>
  );
};
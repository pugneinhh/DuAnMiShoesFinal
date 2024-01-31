import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

function ProductRow() {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState();

  const decreaseQuantity = () => {
    setQuantity(quantity - 1 >= 0 ? quantity - 1 : 0);
    setPrice(quantity*120000)
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
     setPrice(quantity * 120000);
  };

  return (
    <tr>
      <td className="row">
        <div className="col-md-3">
          <img
            style={{ width: 100, height: 100 }}
            src="https://res-console.cloudinary.com/dm0w2qws8/thumbnails/v1/image/upload/v1705931217/eTN5eGM4bHdkdHZvYWZkZ21ucmE=/preview"
            alt="Product"
          ></img>
        </div>
        <div className="col-md-5 fw-bold" style={{ paddingLeft: 20 }}>
          <h6> Nike Adidas Grand Court</h6>
          <h6 className="mt-2">39</h6>
          <div
            className="mt-2"
            style={{
              backgroundColor: "red",
              borderRadius: 6,
              width: 60,
              height: 25,
            }}
          ></div>
        </div>
      </td>
      <td>
        <h6 className=" fw-bold" style={{ color: "red", marginTop: "35px" }}>
          120000
        </h6>
      </td>
      <td>
        <div style={{ marginTop: "30px" }}>
          <button
            onClick={decreaseQuantity}
            style={{ width: 35, borderRadius: 10 }}
          >
            -
          </button>
          <input
            value={quantity}
            className="ms-2 me-2 text-center"
            style={{ width: 35 }}
            min={0}
            readOnly
          ></input>
          <button
            onClick={increaseQuantity}
            style={{ width: 35, borderRadius: 10 }}
          >
            +
          </button>
        </div>
      </td>
      <td>
        <h6 className=" fw-bold" style={{ color: "red", marginTop: "35px" }}>
          ${price}
        </h6>
      </td>
      <td>
        <button style={{ marginTop: "30px" }}>
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  );
}

export default ProductRow;

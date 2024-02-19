import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { GioHangAPI } from "../../../pages/censor/api/gioHang/gioHang.api";

function ProductRow({product,loadghct}) {
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [ctsp,setCtsp]=useState({});
  const [priceOne, setPriceOne] = useState();
  useEffect(() => {
    setQuantity(product.soLuong);
    setPrice(product.thanhTien);
    setPriceOne(product.thanhTien/product.soLuong);
    GioHangAPI.detailCTSP(product.chiTietSanPham).then((res)=>{
      setCtsp(res.data);
      console.log("ctspgh",res.data);
    })
  }, []);

  const decreaseQuantity = () => {
    setQuantity(quantity - 1 > 0 ? quantity - 1 : 0);
    setPrice(quantity>0?price-priceOne:0)
    if(quantity>0){
    handleUpdateGHCT(quantity-1, price-priceOne,product);
    }
    if(quantity===1){
     handleDeleteGHCT();
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1 <ctsp.soLuong ? quantity +1 : ctsp.soLuong);
    setPrice(quantity<ctsp.soLuong?price+priceOne:price);
    if(quantity<ctsp.soLuong){
    handleUpdateGHCT(quantity+1, price+priceOne,product);
    }
  };
  const handleDeleteGHCT = () => {
    GioHangAPI.deleteGHCT(product.id).then((res)=>{
      console.log("remove ghct",res.data)
      loadghct();
    })
  };
  const handleUpdateGHCT = (quantity,price,product) => {
    console.log("qqqqqq",quantity,price,product)
    const data = {
      id:product.id,
      gioHang: product.gioHang,
      chiTietSanPham: product.chiTietSanPham,
      soLuong: quantity,
      thanhTien: price,
    };
    GioHangAPI.updateGHCT(data).then((res)=>{
      console.log("ghctupdate",res.data);
      loadghct();
    })
  };
  return (
    <tr>
      <td className="row">
        <div className="col-md-3">
          <img
            style={{ width: 100, height: 100 }}
            src={ctsp.ghiChu}
            alt="Product"
          ></img>
        </div>
        <div className="col-md-5 fw-bold" style={{ paddingLeft: 20 }}>
          <h6> {ctsp.tenSP}</h6>
          <h6 className="mt-2">{ctsp.kichThuoc}</h6>
          <div
            className="mt-2"
            style={{
              backgroundColor: `${ctsp.mauSac}`,
              borderRadius: 6,
              width: 60,
              height: 25,
            }}
          ></div>
        </div>
      </td>
      <td>
        <h6 className=" fw-bold" style={{ color: "red", marginTop: "35px" }}>
          {ctsp.giaBan}
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
          {price}VNĐ
        </h6>
      </td>
      <td>
        <button style={{ marginTop: "30px" }} onClick={handleDeleteGHCT}>
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  );
}

export default ProductRow;

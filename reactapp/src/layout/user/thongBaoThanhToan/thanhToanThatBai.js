import React, { useEffect, useState, useRef } from "react";
import "./thanhToanThongbao.css";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
export default function ThanhToanThatBai() {
      const nav = useNavigate();
  useEffect(() => {
    checkOut();
  }, []);

  const checkOut = () => {
    const storedFormString = localStorage.getItem('formData');
    const storedForm = JSON.parse(storedFormString);
    if(storedForm !== null){
      localStorage.removeItem('formData');
    }
  };
    const backGioHang = (res) => {
      nav("/gio-hang");
    };


  return (
    <div className="resultContainer">
      <Result
        status="500"
        title="Thanh toán thất bại"
        subTitle="Bạn có muốn tiếp tục thanh toán ???"
        extra={
          <Button type="primary" onClick={backGioHang}>
            Tiếp tục thanh toán
          </Button>
        }
      />
    </div>
  );
  

}

import React, { useEffect, useState, useRef } from "react";
import { BanHangClientAPI } from "../../../pages/censor/api/banHangClient/banHangClient.api";
export default function ThanhToanThanhCong() {
  useEffect(() => {
    checkOut();
  }, []);

  const checkOut = () => {
    const storedFormString = localStorage.getItem('formData');
    const storedForm = JSON.parse(storedFormString);
    if(storedForm !== null){
      BanHangClientAPI.checkout(storedForm);
      localStorage.removeItem('formData');
    }
  };
  return (
    <div>
            Thanh cong
    </div>
  );
}

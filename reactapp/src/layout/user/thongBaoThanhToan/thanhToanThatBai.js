import React, { useEffect, useState, useRef } from "react";


export default function ThanhToanThatBai() {
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



  return ( 
    
    <div>Thaast bai</div>
    
    );
  

}

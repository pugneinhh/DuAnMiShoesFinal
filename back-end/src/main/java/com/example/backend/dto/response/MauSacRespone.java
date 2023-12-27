package com.example.backend.dto.response;

import org.springframework.beans.factory.annotation.Value;

public interface MauSacRespone {

     @Value("#{target.ma}")
     String getMa();

     @Value("#{target.ten}")
     String getTen();

//     Date getNgayTao();
//
//     Date getNgaySua();
//
//     String getNguoiTao();
//
//     String getNguoiSua();

     @Value("#{target.trangThai}")
     String getTrangThai();
}

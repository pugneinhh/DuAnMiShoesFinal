package com.example.duanmishoes.dto.respone;

import org.springframework.beans.factory.annotation.Value;

import java.sql.Date;

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

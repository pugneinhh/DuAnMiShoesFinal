package com.example.duanmishoes.model;

import org.springframework.beans.factory.annotation.Value;

public interface AdminKhachHangRepon {
    @Value("#{target.idKH}")
    String getIdKH();

    @Value("#{target.maKH}")
    String getMaKH();

    @Value("#{target.tenKH}")
    String getTenKH();

    @Value("#{target.anh}")
    String getAnh();


    @Value("#{target.sdt}")
    String getSDT();

    @Value("#{target.email}")
    String getEmail();


}

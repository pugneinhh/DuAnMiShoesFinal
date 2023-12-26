package com.example.duanmishoes.model;

import org.springframework.beans.factory.annotation.Value;

public interface AdminNhanVienRespon {

    @Value("#{target.idNV}")
    String getIdNV();

    @Value("#{target.maCV}")
    String getMaCV();

    @Value("#{target.maNV}")
    String getMaNV();

    @Value("#{target.tenNV}")
    String getTenNV();

    @Value("#{target.anhNV}")
    String getAnh();

    @Value("#{target.gioiTinh}")
    String getGioiTinh();

    @Value("#{target.ngaySinh}")
    String getNgaySinh();

    @Value("#{target.SDT}")
    String getSDT();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.cccd}")
    String getCCCD();

    @Value("#{target.thanhPho}")
    String getThanhPho();

    @Value("#{target.huyen}")
    String getHuyen();

    @Value("#{target.xa}")
    String getXa();

    @Value("#{target.diaChiCuThe}")
    String getDiaChiCuThe();

    @Value("#{target.matKhau}")
    String getMatKhau();
}

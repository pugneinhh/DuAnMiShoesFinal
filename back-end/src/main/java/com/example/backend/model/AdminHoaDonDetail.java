package com.example.duanmishoes.model;

import org.springframework.beans.factory.annotation.Value;

public interface AdminHoaDonDetail {
    @Value("#{target.idHD}")
    String getIdHD();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.maNV}")
    String getMaNV();

    @Value("#{target.tenKH}")
    String getTenKH();

    @Value("#{target.loaiHD}")
    String getLoaiHD();

    @Value("#{target.sdt}")
    String getSDT();
    @Value("#{target.ngayMua}")
    String getNgayMua();

    @Value("#{target.thanhTien}")
    String getThanhTien();

    @Value("#{target.trangThai}")
    String getTrangThai();
    @Value("#{target.diaChiKH}")
    String getDiaChiKH();
    @Value("#{target.ghiChuHD}")
    String getGhiChuHD();
}

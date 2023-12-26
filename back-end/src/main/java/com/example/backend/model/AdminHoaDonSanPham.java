package com.example.duanmishoes.model;

import org.springframework.beans.factory.annotation.Value;

public interface AdminHoaDonSanPham {
    @Value("#{target.soLuongSP}")
    String getSoLuongSP();

    @Value("#{target.giaBanSP}")
    String getGiaBanSP();

    @Value("#{target.tenHA}")
    String getTenHA();

    @Value("#{target.TenSP}")
    String getTenSP();
    @Value("#{target.tenKichThuoc}")
    String getTenKichThuoc();
    @Value("#{target.tenMauSac}")
    String getTenMauSac();
    @Value("#{target.tenHang}")
    String getTenHang();
    @Value("#{target.thanhTienSP}")
    String getThanhTienSP();

}

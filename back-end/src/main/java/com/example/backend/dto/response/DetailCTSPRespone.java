package com.example.backend.dto.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface DetailCTSPRespone {
    @Value("#{target.sanPham}")
    String getSanPham();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.tenSP}")
    String getTenSP();

    @Value("#{target.kichThuoc}")
    String getKichThuoc();

    @Value("#{target.mauSac}")
    String getMauSac();

    @Value("#{target.chatLieu}")
    String getChatLieu();

    @Value("#{target.deGiay}")
    String getDeGiay();

    @Value("#{target.danhMuc}")
    String getDanhMuc();

    @Value("#{target.hang}")
    String getHang();

    @Value("#{target.soLuong}")
    int getSoLuong();

    @Value("#{target.giaBan}")
    BigDecimal getGiaBan();

    @Value("#{target.moTa}")
    String getMoTa();

    @Value("#{target.trangThai}")
    int getTrangThai();
}

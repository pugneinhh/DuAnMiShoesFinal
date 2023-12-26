package com.example.duanmishoes.model;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.sql.Date;

public interface AdminVoucher {
    @Value("#{target.id}")
    String getId();
    @Value("#{target.ma}")
    String getMa();
    @Value("#{target.ten}")
    String getTen();
    @Value("#{target.phuongThuc}")
    String getPhuongThuc();
    @Value("#{target.mucDo}")
    int getMucDo();
    @Value("#{target.giamToiDa}")
    BigDecimal getGiamToiDa();
    @Value("#{target.dieuKien}")
    String getDieuKien();
    @Value("#{target.soLuong}")
    int getSoLuong();
    @Value("#{target.loaiVoucher}")
    String getLoaiVoucher();
    @Value("#{target.ngayBatDau}")
    String getNgayBatDau();
    @Value("#{target.ngayKetThuc}")
    String getNgayKetThuc();
    @Value("#{target.trangThai}")
    int getTrangThai();
}

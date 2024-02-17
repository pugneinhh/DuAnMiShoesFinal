package com.example.backend.dto.response;


import java.math.BigDecimal;

public interface GioHangChiTietRespone {
    public String getID();
    public String getGioHang();
    public String getChiTietSanPham();
    public int getSoLuong();
    public BigDecimal getThanhTien();
    public int getTrangThai();
}

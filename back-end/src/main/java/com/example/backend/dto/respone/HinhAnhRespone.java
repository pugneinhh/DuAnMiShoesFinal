package com.example.backend.dto.respone;


import java.time.LocalDateTime;

public interface HinhAnhRespone {
    public String getMa();
    public String getTen();
    public String getUrl();
    public LocalDateTime getNgayTao();
    public LocalDateTime getNgaySua();
    public String getNguoiTao();
    public String getNguoiSua();
    public int getTrangThai();
}

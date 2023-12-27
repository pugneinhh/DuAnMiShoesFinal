package com.example.backend.dto.response;


import java.sql.Date;

public interface HangRespone {
    public String getMa();

    public String getTen();

    public Date getNgayTao();

    public Date getNgaySua();

    public String getNguoiTao();

    public String getNguoiSua();

    public int getTrangThai();
}

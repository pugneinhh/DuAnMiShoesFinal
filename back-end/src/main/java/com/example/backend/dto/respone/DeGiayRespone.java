package com.example.backend.dto.respone;


import java.sql.Date;

public interface DeGiayRespone {
    public String getMa();

    public String getTen();

    public Date getNgayTao();

    public Date getNgaySua();

    public String getNguoiTao();

    public String getNguoiSua();

    public int getTrangThai();
}

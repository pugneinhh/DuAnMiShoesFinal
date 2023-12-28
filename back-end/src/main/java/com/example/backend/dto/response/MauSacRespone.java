package com.example.backend.dto.response;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface MauSacRespone {
     public String getMa();

     public String getTen();

     public LocalDateTime getNgayTao();

     public LocalDateTime getNgaySua();

     public String getNguoiTao();

     public String getNguoiSua();

     public int getTrangThai();
}

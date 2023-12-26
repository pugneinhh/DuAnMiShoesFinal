package com.example.duanmishoes.dto.respone;

import java.time.LocalDateTime;

public interface GioHangRespone {
    public String getMa();
    public String getNguoiTao();
    public String getNguoiSua();
    public LocalDateTime getNgayTao();
    public LocalDateTime getNgaySua();
    public int getTrangThai();
}

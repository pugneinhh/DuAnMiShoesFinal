package com.example.duanmishoes.dto.respone;

import java.time.LocalDateTime;

public interface NguoiDungVoucherRespone {
    public String getNguoiTao();
    public String getNguoiSua();
    public LocalDateTime getNgayTao();
    public LocalDateTime getNgaySua();
    public int getTrangThai();
}

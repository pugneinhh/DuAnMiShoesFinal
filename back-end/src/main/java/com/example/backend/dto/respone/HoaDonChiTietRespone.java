package com.example.duanmishoes.dto.respone;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface HoaDonChiTietRespone {
    public int getSoLuong();
    public BigDecimal getGiaSauGiam();
    public BigDecimal getGiaGiam();
    public String getNguoiTao();
    public String getNguoiSua();
    public LocalDateTime getNgayTao();
    public LocalDateTime getNgaySua();
    public int getTrangThai();
}

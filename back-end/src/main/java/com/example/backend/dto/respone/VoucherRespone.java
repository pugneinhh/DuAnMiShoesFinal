package com.example.duanmishoes.dto.respone;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.sql.Date;

public interface VoucherRespone {
    public String getMa();
    public String getTen();
    public String getLoaiVoucher();
    public LocalDateTime getNgayBatDau();
    public LocalDateTime getNgayKetThuc();
    public int getMucDo();
    public BigDecimal getGiamToiDa();
    public BigDecimal getDieuKien();
    public int getSoLuong();
    public String getNguoiTao();
    public String getNguoiSua();
    public Date getNgayTao();
    public Date getNgaySua();
    public int getTrangThai();
}

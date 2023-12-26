package com.example.duanmishoes.dto.respone;

import java.time.LocalDateTime;

public interface LichSuDiemRespone {
    public int getDiem();
    public LocalDateTime getNgayTao();
    public LocalDateTime getNgaySua();
    public String getNguoiTao();
    public String getNguoiSua();
    public int getTrangThai();
}

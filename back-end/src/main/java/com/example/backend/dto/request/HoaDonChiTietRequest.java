package com.example.duanmishoes.dto.request;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class HoaDonChiTietRequest {

    private int soLuong;
    private BigDecimal giaSauGiam;
    private BigDecimal giaGiam;
    private String nguoiTao;
    private String nguoiSua;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private int trangThai;
}

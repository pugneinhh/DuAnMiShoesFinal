package com.example.duanmishoes.dto.request;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class GioHangChiTietRequest {
    private int soLuong;
    private BigDecimal thanhTien;
    private int trangThai;
}

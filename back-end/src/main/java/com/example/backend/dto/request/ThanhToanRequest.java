package com.example.duanmishoes.dto.request;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ThanhToanRequest {
    private int phuongThuc;
    private BigDecimal tienMat;
    private BigDecimal chuyenKhoan;
    private BigDecimal tongTien;
    private String phuongThucVnp;
    private String moTa;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private String nguoiTao;
    private String nguoiSua;
    private int trangThai;
}

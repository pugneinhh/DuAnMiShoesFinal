package com.example.duanmishoes.dto.request;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class CongThucRequest {

    private BigDecimal giaTriDoi;
    private BigDecimal tiSo;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private String nguoiTao;
    private String nguoiSua;
    private int trangThai;
}

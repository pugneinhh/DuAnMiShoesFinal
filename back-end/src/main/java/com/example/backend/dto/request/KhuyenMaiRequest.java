package com.example.duanmishoes.dto.request;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class KhuyenMaiRequest {
    private String ma;
    private String ten;
    private BigDecimal giaTriKhuyenMai;
    private LocalDateTime ngayBatDau;
    private LocalDateTime ngayKetThuc;
    private String loai;
    private String nguoiTao;
    private String nguoiSua;
    private Date ngayTao;
    private Date ngaySua;
    private Integer trangThai;
}

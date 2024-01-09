package com.example.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KhuyenMaiSearch {
    String ma;
    String ten;
    String loai;
    BigDecimal gia_tri_khuyen_mai;
    LocalDateTime ngay_bat_dau;
    LocalDateTime ngay_ket_thuc;
}

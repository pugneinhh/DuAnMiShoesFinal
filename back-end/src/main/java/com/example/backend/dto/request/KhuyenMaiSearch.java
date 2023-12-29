package com.example.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KhuyenMaiSearch {
    String ma;
    String ten;
    String loai;
    BigDecimal gia_tri_khuyen_mai;
    Date ngayBatDau;
    Date ngayKetThuc;
}

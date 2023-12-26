package com.example.duanmishoes.dto.request;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LichSuHoaDonRequest {
    private String moTaHoatDong;
    private String nguoiTao;
    private String nguoiSua;
    private java.util.Date ngayTao;
    private Date ngaySua;
    private int trangThai;
}

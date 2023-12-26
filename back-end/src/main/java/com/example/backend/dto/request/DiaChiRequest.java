package com.example.duanmishoes.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class DiaChiRequest {
    private String tenNguoiNhan;

    private String soDienThoai;
    private String diaChi;
    private String idXa;
    private String idHuyen;
    private String idThanhPho;
    private String idQuocGia;
    private String tenXa;
    private String tenHuyen;
    private String tenThanhPho;
    private String quocGia;
    private int trangThai;
}

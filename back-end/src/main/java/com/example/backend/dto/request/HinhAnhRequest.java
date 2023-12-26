package com.example.duanmishoes.dto.request;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class HinhAnhRequest {
    private String ma;
    private String ten;
    private String url;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private String nguoiTao;
    private String nguoiSua;
    private int trangThai;
}

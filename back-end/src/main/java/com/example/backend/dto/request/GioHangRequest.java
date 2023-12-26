package com.example.duanmishoes.dto.request;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class GioHangRequest {

    private String ma;
    private String nguoiTao;
    private String nguoiSua;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private int trangThai;
}

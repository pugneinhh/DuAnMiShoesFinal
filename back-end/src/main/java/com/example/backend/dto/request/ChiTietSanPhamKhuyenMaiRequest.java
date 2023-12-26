package com.example.duanmishoes.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ChiTietSanPhamKhuyenMaiRequest {
    private String ma;
    private int trangThai;
}

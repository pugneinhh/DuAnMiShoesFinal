package com.example.duanmishoes.dto.request;

import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NguoiDungRequest {

    private String ma;
    private String ten;
    private Date ngaySinh;
    private String soDienThoai;
    private LocalDateTime ngayThamGia;
    private String chungMinhThu;
    private boolean gioiTinh;
    private String anh;
    private String email;
    private String matKhau;
    private String nguoiTao;
    private String nguoiSua;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private String chucVu;
    private String hangKhachHang;
    private int diem;
    private int trangThai;
}

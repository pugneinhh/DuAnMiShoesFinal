package com.example.duanmishoes.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "nguoi_dung")
@Data
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String ma;
    private String ten;
    private Date ngaySinh;
    private String soDienThoai;
    @ManyToOne
    @JoinColumn(name = "dia_chi_id")
    private DiaChi diaChi;
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

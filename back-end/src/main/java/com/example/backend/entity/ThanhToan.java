package com.example.duanmishoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "thanh_toan")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ThanhToan {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    @JoinColumn(name = "hoa_don_id")
    private HoaDon hoaDon;
    private int phuongThuc;
    private BigDecimal tienMat;
    private BigDecimal chuyenKhoan;
    private BigDecimal tongTien;
    private String phuongThucVnp;
    private String moTa;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private String nguoiTao;
    private String nguoiSua;
    private int trangThai;
}

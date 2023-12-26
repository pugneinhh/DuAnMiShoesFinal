package com.example.duanmishoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "hinh_anh")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HinhAnh {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    @JoinColumn(name = "chi_tiet_san_pham_id")
    private ChiTietSanPham chiTietSanPham;
    private String ma;
    private String ten;
    private String url;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private String nguoiTao;
    private String nguoiSua;
    private int trangThai;

}

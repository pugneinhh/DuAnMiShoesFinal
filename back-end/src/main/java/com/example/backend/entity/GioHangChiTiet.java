package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "gio_hang_chi_tiet")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class GioHangChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    @JoinColumn(name = "chi_tiet_sp_id")
    private ChiTietSanPham chiTietSanPham;
    @ManyToOne
    @JoinColumn(name = "gio_hang_id")
    private GioHang gioHang;
    private int soLuong;
    private BigDecimal thanhTien;
    private int trangThai;
}

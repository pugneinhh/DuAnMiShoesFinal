package com.example.duanmishoes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "nguoidung_voucher")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class NguoiDungVoucher {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    @JoinColumn(name = "voucher_id")
    private Voucher voucher;
    @ManyToOne
    @JoinColumn(name = "nguoi_dung_id")
    private NguoiDung nguoiDung;
    private String nguoiTao;
    private String nguoiSua;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private int trangThai;
}

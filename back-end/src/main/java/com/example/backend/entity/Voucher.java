package com.example.duanmishoes.entity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;
@Entity
@Table(name = "voucher")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String ma;
    private String ten;
    private String loaiVoucher;
    private LocalDateTime ngayBatDau;
    private LocalDateTime ngayKetThuc;
    private int mucDo;
    private BigDecimal giamToiDa;
    private BigDecimal dieuKien;
    private int soLuong;
    private String nguoiTao;
    private String nguoiSua;
    private Date ngayTao;
    private Date ngaySua;
    private int trangThai;
}

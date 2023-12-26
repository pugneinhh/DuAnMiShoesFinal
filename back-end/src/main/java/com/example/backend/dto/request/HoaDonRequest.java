package com.example.duanmishoes.dto.request;

import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class HoaDonRequest {
    private LocalDateTime ngayMua;
    private BigDecimal giaGoc;
    private BigDecimal giaGiamGia;
    private BigDecimal thanhTien;
    private int diemSuDung;
    private int giaTriDiem;
    private int loaiHoaDon;
    private String tenNguoiNhan;
    private String soDienThoai;
    private String email;
    private String diaChi;
    private String qrCode;
    private String ghiChu;
    private Date ngayDuKienNhan;
    private Date ngayNhanHang;
    private Date ngayTraHang;
    private String nguoiTao;
    private String nguoiSua;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private int trangThai;
}

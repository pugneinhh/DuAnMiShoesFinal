package com.example.backend.dto.request;


import com.example.backend.entity.HoaDon;
import com.example.backend.entity.NguoiDung;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class HoaDonRequest {
    String ma;
    String nhanVien;
    String khachHang;
     LocalDateTime ngayMua;
     BigDecimal giaGoc;
     BigDecimal giaGiamGia;
     BigDecimal thanhTien;
     int diemSuDung;
     int giaTriDiem;
     int loaiHoaDon;
     String tenNguoiNhan;
     String soDienThoai;
     String email;
     String diaChi;
     String qrCode;
     String ghiChu;
     Date ngayDuKienNhan;
     Date ngayNhanHang;
     Date ngayTraHang;
     String nguoiTao;
     String nguoiSua;
     LocalDateTime ngayTao;
     LocalDateTime ngaySua;
     int trangThai;

     public HoaDon map(HoaDon hoaDon){
         hoaDon.setMa(this.ma);
         hoaDon.setNhanVien(this.nhanVien);
         hoaDon.setNgayMua(this.ngayMua);
         hoaDon.setGiaGoc(this.giaGoc);
         hoaDon.setGiaGiamGia(this.giaGiamGia);
         hoaDon.setThanhTien(this.thanhTien);
         hoaDon.setDiemSuDung(this.diemSuDung);
         hoaDon.setLoaiHoaDon(this.loaiHoaDon);
         hoaDon.setTenNguoiNhan(this.tenNguoiNhan);
         hoaDon.setSoDienThoai(this.soDienThoai);
         hoaDon.setEmail(this.email);
         hoaDon.setDiaChi(this.diaChi);
         hoaDon.setQrCode(this.qrCode);
         hoaDon.setGhiChu(this.ghiChu);
         hoaDon.setNgayNhanHang(this.ngayNhanHang);
         hoaDon.setNgayTraHang(this.ngayTraHang);
         hoaDon.setNguoiTao(this.nguoiTao);
         hoaDon.setNguoiSua(this.nguoiSua);
         hoaDon.setNgayTao(this.ngayTao);
         hoaDon.setNgaySua(this.ngaySua);
         hoaDon.setTrangThai(this.trangThai);
         if(this.khachHang==null){
             hoaDon.setNguoiDung(null);
         }else {
             hoaDon.setNguoiDung(NguoiDung.builder().id(this.khachHang).build());

         }
         return hoaDon;
     }
}

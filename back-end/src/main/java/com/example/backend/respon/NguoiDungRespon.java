package com.example.backend.respon;

import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminKhachHangRepon;
import com.example.backend.model.AdminNhanVienRespon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface NguoiDungRespon extends JpaRepository<NguoiDung, UUID> {
    @Query(value = "SELECT nd.id AS idND, nd.ma AS maND, nd.ten AS tenND, nd.so_dien_thoai AS SDT,\n" +
            "  nd.email AS email,nd.ngay_sinh AS ngaySinh,nd.gioi_tinh AS gioiTinh, nd.chung_minh_thu AS cccd, nd.chuc_vu AS chucVu, nd.anh AS anh, nd.trang_thai AS trangThai,\n" +
            "  dc.ten_nguoi_nhan AS tenNguoiNhan, dc.so_dien_thoai AS sdtNguoiNhan,\n" +
            "  dc.ten_thanh_pho AS tenThanhPho, dc.ten_huyen AS tenHuyen, dc.ten_xa AS tenXa\n" +
            "FROM nguoi_dung nd\n" +
            "INNER JOIN dia_chi dc ON nd.dia_chi_id = dc.id", nativeQuery = true)
    List<AdminNhanVienRespon> getAllNhanVien();

    @Query(value = "SELECT nd.id AS idND, nd.ma AS maND, nd.ten AS tenND, nd.so_dien_thoai AS SDT,\n" +
            "  nd.email AS email,nd.ngay_sinh AS ngaySinh,nd.gioi_tinh AS gioiTinh, nd.chung_minh_thu AS cccd, nd.chuc_vu AS chucVu, nd.anh AS anh, nd.trang_thai AS trangThai,\n" +
            "  dc.ten_nguoi_nhan AS tenNguoiNhan, dc.so_dien_thoai AS sdtNguoiNhan,\n" +
            "  dc.ten_thanh_pho AS tenThanhPho, dc.ten_huyen AS tenHuyen, dc.ten_xa AS tenXa\n" +
            "FROM nguoi_dung nd\n" +
            "INNER JOIN dia_chi dc ON nd.dia_chi_id = dc.id", nativeQuery = true)
    List<AdminKhachHangRepon> getAllKhachHang();
}

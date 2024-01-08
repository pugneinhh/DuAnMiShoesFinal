package com.example.backend.repository;

import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminKhachHangRepon;
import com.example.backend.model.AdminNhanVienRespon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface NguoiDungRepository extends JpaRepository<NguoiDung, String> {
    @Query(value = "SELECT CASE WHEN nd.diem IS NULL THEN N'0'ELSE nd.diem END  as diem, nd.id AS idND, nd.ma AS maND, nd.ten AS tenND, nd.so_dien_thoai AS SDT,\n" +
            "  CASE WHEN nd.email IS NULL THEN N'Không có'ELSE nd.email END  as email,CASE WHEN nd.ngay_sinh IS NULL THEN N'Không có'ELSE nd.ngay_sinh END  as ngaySinh\n" +
            "  ,nd.gioi_tinh AS gioiTinh, nd.chung_minh_thu AS cccd, CASE WHEN nd.anh IS NULL THEN N'Không có'ELSE nd.anh END  as anh, \n" +
            "  nd.trang_thai AS trangThai\n" +
            "FROM nguoi_dung nd WHERE nd.chuc_vu = 'nhan_vien' ", nativeQuery = true)
    List<AdminNhanVienRespon> getAllNhanVien();

    @Query(value = "SELECT CASE WHEN nd.diem IS NULL THEN N'0'ELSE nd.diem END  as diem, nd.id AS idND, nd.ma AS maND, nd.ten AS tenND, nd.so_dien_thoai AS SDT,\n" +
            "  CASE WHEN nd.email IS NULL THEN N'Không có'ELSE nd.email END  as email,CASE WHEN nd.ngay_sinh IS NULL THEN N'Không có'ELSE nd.ngay_sinh END  as ngaySinh\n" +
            "  ,nd.gioi_tinh AS gioiTinh, nd.chung_minh_thu AS cccd, CASE WHEN nd.anh IS NULL THEN N'Không có'ELSE nd.anh END  as anh, \n" +
            "  nd.trang_thai AS trangThai\n" +
            "FROM nguoi_dung nd WHERE nd.chuc_vu = 'khach_hang'", nativeQuery = true)
    List<AdminKhachHangRepon> getAllKhachHang();
}

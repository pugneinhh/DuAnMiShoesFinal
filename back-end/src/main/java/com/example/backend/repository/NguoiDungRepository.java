package com.example.backend.repository;

import com.example.backend.dto.response.KhachHangRespon;
import com.example.backend.dto.response.NhanVienRespon;
import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminKhachHangRepon;
import com.example.backend.model.AdminNhanVienRespon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface NguoiDungRepository extends JpaRepository<NguoiDung, String> {
    @Query(value = "SELECT CASE WHEN nd.diem IS NULL THEN N'0'ELSE nd.diem END  as diem, nd.id AS idND, nd.ma AS maND, nd.ten AS tenND, nd.so_dien_thoai AS SDT,\n" +
            "  CASE WHEN nd.email IS NULL THEN N'Không có'ELSE nd.email END  as email,CASE WHEN nd.ngay_sinh IS NULL THEN N'Không có'ELSE nd.ngay_sinh END  as ngaySinh\n" +
            "  ,nd.gioi_tinh AS gioiTinh, nd.chung_minh_thu AS cccd, CASE WHEN nd.anh IS NULL THEN N'Không có'ELSE nd.anh END  as anh, \n" +
            "  nd.trang_thai AS trangThai\n" +
            "FROM nguoi_dung nd WHERE nd.chuc_vu = 'nhan_vien' order by maND desc ", nativeQuery = true)
    List<AdminNhanVienRespon> getAllNhanVien();

    @Query(value = "SELECT CASE WHEN nd.diem IS NULL THEN N'0'ELSE nd.diem END  as diem, nd.id AS idND, nd.ma AS maND, nd.ten AS tenND, nd.so_dien_thoai AS SDT,\n" +
            "  CASE WHEN nd.email IS NULL THEN N'Không có'ELSE nd.email END  as email,CASE WHEN nd.ngay_sinh IS NULL THEN N'Không có'ELSE nd.ngay_sinh END  as ngaySinh\n" +
            "  ,nd.gioi_tinh AS gioiTinh, nd.chung_minh_thu AS cccd, CASE WHEN nd.anh IS NULL THEN N'Không có'ELSE nd.anh END  as anh, \n" +
            "  nd.trang_thai AS trangThai\n" +
            "FROM nguoi_dung nd WHERE nd.chuc_vu = 'khach_hang' order by maND desc ", nativeQuery = true)
    List<AdminKhachHangRepon> getAllKhachHang();

    @Query(value = """
            SELECT ROW_NUMBER() OVER (ORDER BY u.ngay_tham_gia DESC ) AS stt,
                            u.id AS id,
                            u.ten AS ten,
                            u.ma AS ma,
                            u.email AS email,
                            u.gioi_tinh AS gioiTinh,
                            u.chung_minh_thu AS canCuocCongDan,
                            u.ngay_sinh AS ngaySinh,
                            u.so_dien_thoai AS soDienThoai,
                            u.anh AS anh,
                            u.ngay_tao AS ngayTao,
                            u.ngay_tham_gia AS ngayThamGia,
                            u.trang_thai AS trangThai,
                            a.id AS idDiaChi,
                            a.ten_thanh_pho AS tenThanhPho,
                            a.ten_huyen AS tenHuyen,
                            a.ten_xa AS tenXa,
                            a.dia_chi AS diaChi
                       FROM nguoi_dung u
                       LEFT JOIN dia_chi a on u.id = a.nguoi_dung_id
                       WHERE a.trang_thai=0 AND u.chuc_vu = 'khach_hang' AND u.id = :id
            """,nativeQuery = true)
    KhachHangRespon findByIdCustomer (@Param("id") String id);

    @Query(value = """
            SELECT ROW_NUMBER() OVER (ORDER BY u.ngay_tham_gia DESC ) AS stt,
                            u.id AS id,
                            u.ten AS ten,
                            u.ma AS ma,
                            u.email AS email,
                            u.gioi_tinh AS gioiTinh,
                            u.chung_minh_thu AS canCuocCongDan,
                            u.ngay_sinh AS ngaySinh,
                            u.so_dien_thoai AS soDienThoai,
                            u.anh AS anh,
                            u.ngay_tao AS ngayTao,
                            u.ngay_tham_gia AS ngayThamGia,
                            u.trang_thai AS trangThai,
                            a.id AS idDiaChi,
                            a.ten_thanh_pho AS tenThanhPho,
                            a.ten_huyen AS tenHuyen,
                            a.ten_xa AS tenXa,
                            a.dia_chi AS diaChi
                       FROM nguoi_dung u
                       LEFT JOIN dia_chi a on u.id = a.nguoi_dung_id
                       WHERE a.trang_thai=0 AND u.chuc_vu = 'nhan_vien' AND u.id = :id
            """,nativeQuery = true)
    NhanVienRespon findByIdNhanVien (@Param("id") String id);
}

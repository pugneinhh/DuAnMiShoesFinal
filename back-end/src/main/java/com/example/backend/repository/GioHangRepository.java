package com.example.backend.repository;

import com.example.backend.dto.response.GioHangRespone;
import com.example.backend.entity.GioHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GioHangRepository extends JpaRepository<GioHang,String> {
    @Query(value = """
        SELECT gh.id,gh.ma,gh.nhan_vien_id as nhanVien ,gh.khach_hang_id as khachHang,gh.nguoi_tao,gh.nguoi_sua,gh.ngay_tao,gh.ngay_sua,gh.trang_thai  from gio_hang gh join nguoi_dung on gh.khach_hang_id=nguoi_dung.id where gh.khach_hang_id=:idKH
""",nativeQuery = true)
    GioHangRespone detailGioHang(String idKH);
    @Query(value = """
        SELECT gh.id,gh.ma,gh.nhan_vien_id as nhanVien ,gh.khach_hang_id as khachHang,gh.nguoi_tao,gh.nguoi_sua,gh.ngay_tao,gh.ngay_sua,gh.trang_thai  from gio_hang gh where gh.id=:id
""",nativeQuery = true)
    GioHangRespone detailGHByID(String id);
}

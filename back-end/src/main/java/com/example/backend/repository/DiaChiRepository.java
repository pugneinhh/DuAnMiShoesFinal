package com.example.backend.repository;

import com.example.backend.dto.response.DiaChiKhachHangRespon;
import com.example.backend.dto.response.DiaChiRespone;
import com.example.backend.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface DiaChiRepository extends JpaRepository<DiaChi, String> {
    @Query(value = "SELECT * FROM dia_chi a WHERE a.trang_thai = 0 AND a.nguoi_dung_id =:id",nativeQuery = true)
    DiaChi findByUserAndStatus (@Param("id") String user);
    @Query(value = "SELECT ten_nguoi_nhan as tenNguoiNhan, so_dien_thoai as soDienThoai,dia_chi as diaChi,ten_xa as tenXa,ten_huyen as tenHuyen\n" +
            ",ten_thanh_pho as tenThanhPho, trang_thai as trangThai from dia_chi where nguoi_dung_id =:id",nativeQuery = true)
    List<DiaChiKhachHangRespon> findDiaChiByKH (@Param("id") String user);
}

package com.example.backend.repository;

import com.example.backend.dto.response.GioHangChiTietRespone;
import com.example.backend.entity.GioHangChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GioHangChiTietRepository extends JpaRepository<GioHangChiTiet,String> {
    @Query(value = """
SELECT gh.id,gh.gio_hang_id as gioHang,gh.chi_tiet_sp_id as chiTietSanPham,gh.so_luong,gh.thanh_tien,gh.trang_thai  from gio_hang_chi_tiet gh join gio_hang on gh.gio_hang_id=gio_hang.id where gh.gio_hang_id=:idGH
""",nativeQuery = true)
    List<GioHangChiTietRespone> getAllGioHangChiTiet(String idGH);
}

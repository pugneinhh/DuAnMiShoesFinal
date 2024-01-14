package com.example.backend.repository;

import com.example.backend.dto.response.SanPhamRespone;
import com.example.backend.entity.SanPham;
import com.example.backend.model.AdminSanPhamRespon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface SanPhamRepository extends JpaRepository<SanPham, String> {
    @Query(value = """
    SELECT  
     a.id  AS idSP
    ,a.ma AS ma ,a.ten AS ten
    ,CASE WHEN SUM(coalesce(o.so_luong,0)) IS NULL THEN N'0' ELSE SUM(coalesce(o.so_luong,0)) END AS soLuong
    , a.trang_thai AS trangThai
    FROM san_pham a LEFT JOIN chi_tiet_san_pham o  on o.san_pham_id= a.id GROUP BY ma,ten,a.trang_thai,a.id ORDER BY a.ma DESC
            """, nativeQuery = true)
    List<SanPhamRespone> getALLSP();

    @Query(value = "select san_pham.id from san_pham join chi_tiet_san_pham on san_pham.id = chi_tiet_san_pham.san_pham_id where chi_tiet_san_pham.id = ?1",nativeQuery = true)
    List<String> getIDSPbyCTSP(String id);
}

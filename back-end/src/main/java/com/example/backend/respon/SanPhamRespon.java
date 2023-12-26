package com.example.duanmishoes.respon;


import com.example.duanmishoes.entity.SanPham;
import com.example.duanmishoes.model.AdminSanPhamRespon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface SanPhamRespon extends JpaRepository<SanPham, String> {
    @Query(value = """
    SELECT  a.id AS idSP,a.ma AS ma ,a.ten AS ten,SUM(o.so_luong) AS soLuong, a.trang_thai AS trangThai
    FROM san_pham a JOIN chi_tiet_san_pham o  on o.san_pham_id= a.id GROUP BY ma,ten,a.trang_thai,a.id
            """, nativeQuery = true)
    List<AdminSanPhamRespon> getALLSP();

    @Query(value = "select san_pham.id from san_pham join chi_tiet_san_pham on san_pham.id = chi_tiet_san_pham.san_pham_id where chi_tiet_san_pham.id = ?1",nativeQuery = true)
    UUID getIDSPbyCTSP(UUID id);
}

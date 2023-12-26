package com.example.duanmishoes.respon;


import com.example.duanmishoes.entity.ChiTietSanPham;
import com.example.duanmishoes.model.AdminCTSPRespon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CTSPRespon extends JpaRepository<ChiTietSanPham,String> {
    @Query(value = """
            SELECT o.id AS idCTSP,o.mo_ta AS moTa ,sp.ten AS tenSP ,km.ten AS tenKM,kt.ten AS tenKT,ms.ten AS tenMS,cl.ten AS tenCL,dc.ten AS tenDC,dm.ten AS tenDM
            ,h.ten AS tenH,o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai
            FROM chi_tiet_san_pham o
            JOIN san_pham sp  on o.san_pham_id=sp.id
            JOIN khuyen_mai km  on o.khuyen_mai_id=km.id
            JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
            JOIN mau_sac ms  on o.mau_sac_id=ms.id
            JOIN chat_lieu cl  on o.chat_lieu_id=cl.id
            JOIN do_cao dc  on o.do_cao_id=dc.id
            JOIN danh_muc dm  on o.danh_muc_id=dm.id
            JOIN hang h  on o.hang_id=h.id
            WHERE sp.id=:idSP ORDER BY o.id DESC
                     """, nativeQuery = true)
    List<AdminCTSPRespon> getALLCTSP(@Param("idSP") UUID idSP);



    @Query(value = """
            SELECT o.id 
            FROM chi_tiet_san_pham o
            JOIN khuyen_mai km  on o.khuyen_mai_id=km.id
            WHERE km.id=:idKM ORDER BY o.id DESC
                     """, nativeQuery = true)
    List<UUID> getAllCTSPByKM(@Param("idKM") UUID idKM);

}

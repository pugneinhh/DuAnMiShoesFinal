package com.example.backend.repository;


import com.example.backend.dto.response.ChiTietSanPhamRespone;
import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.model.AdminCTSPForKhuyenMai;
import com.example.backend.model.AdminCTSPRespon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CTSPRepository extends JpaRepository<ChiTietSanPham,String> {
    @Query(value = """
            SELECT o.id AS idCTSP,ha.url AS linkAnh ,sp.ten AS tenSP ,kt.ten AS tenKT,ms.ten AS tenMS,ms.ma AS maMS,
            o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai
            FROM chi_tiet_san_pham o
            JOIN san_pham sp  on o.san_pham_id=sp.id
            JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
            JOIN mau_sac ms  on o.mau_sac_id=ms.id
            JOIN hinh_anh ha on o.id=ha.chi_tiet_san_pham_id    
            WHERE o.san_pham_id=:idSP
                     """, nativeQuery = true)
    List<ChiTietSanPhamRespone> getALLCTSP(@Param("idSP") String idSP);



    @Query(value = """
            SELECT o.id 
            FROM chi_tiet_san_pham o
            JOIN khuyen_mai km  on o.khuyen_mai_id=km.id
            WHERE km.id=:idKM ORDER BY o.id DESC
                     """, nativeQuery = true)
    List<String> getAllCTSPByKM(@Param("idKM") String idKM);


    @Query(value = """
            SELECT o.id AS idCTSP,o.mo_ta AS moTa ,sp.ten AS tenSP ,kt.ten AS tenKT,ms.ma AS tenMS,cl.ten AS tenCL,dg.ten AS tenDG,dm.ten AS tenDM
            ,h.ten AS tenH,o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai
            FROM chi_tiet_san_pham o
           LEFT JOIN san_pham sp  on o.san_pham_id=sp.id
           LEFT JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
            LEFT JOIN mau_sac ms  on o.mau_sac_id=ms.id
           LEFT JOIN chat_lieu cl  on o.chat_lieu_id=cl.id
           LEFT JOIN de_giay dg  on o.de_giay_id=dg.id
          LEFT  JOIN danh_muc dm  on o.danh_muc_id=dm.id
           LEFT JOIN hang h  on o.hang_id=h.id
            WHERE sp.id=:idSP ORDER BY o.id DESC
                     """, nativeQuery = true)
    List<AdminCTSPForKhuyenMai> getCTSPBySP (@Param("idSP")String idSP);

    @Query(value = "select ctsp.id from chi_tiet_san_pham ctsp left join khuyen_mai km on ctsp.khuyen_mai_id = km.id where ctsp.khuyen_mai_id =:idKM",nativeQuery = true)
    List<String> getCTSPByKM (String idKM);


}

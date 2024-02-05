package com.example.backend.repository;


import com.example.backend.dto.request.sanphamsearch.CTSPSearch;
import com.example.backend.dto.response.SanPhamClient.DetailCTSPClientRespon;
import com.example.backend.dto.response.SanPhamClient.ListMauSacBySPClientRespon;
import com.example.backend.dto.response.SanPhamClient.ListSizeBySPClientRespon;
import com.example.backend.dto.response.sanpham.CTSPSearchRespone;
import com.example.backend.dto.response.sanpham.ChiTietSanPhamRespone;
import com.example.backend.dto.response.sanpham.DetailCTSPRespone;
import com.example.backend.dto.response.ChiTietSanPhamForBanHang;
import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.model.AdminCTSPForKhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CTSPRepository extends JpaRepository<ChiTietSanPham, String> {
    @Query(value = """
            SELECT o.id AS idCTSP
            ,CASE WHEN MIN(ha.url) IS NULL THEN N'Chưa có ảnh' ELSE MIN(ha.url) END AS linkAnh 
            ,sp.ten AS tenSP ,kt.ten AS tenKT,ms.ten AS tenMS,ms.ma AS maMS
            ,CASE WHEN o.so_luong IS NULL THEN N'0' ELSE o.so_luong END AS soLuong
            ,o.gia_ban AS giaBan,o.trang_thai AS trangThai
            FROM chi_tiet_san_pham o
            JOIN san_pham sp  on o.san_pham_id=sp.id
            JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
            JOIN mau_sac ms  on o.mau_sac_id=ms.id
            JOIN hinh_anh ha on o.id=ha.chi_tiet_san_pham_id    
            WHERE o.san_pham_id=:idSP
             group by o.id
                     """, nativeQuery = true)
    List<ChiTietSanPhamRespone> getALLCTSP(@Param("idSP") String idSP);

    @Query(value = """
            SELECT o.ghi_chu as ghiChu,o.id AS id,o.mo_ta AS moTa ,sp.id AS sanPham,sp.ten AS tenSP ,kt.id AS kichThuoc,ms.id AS mauSac,cl.id AS chatLieu,dc.id AS deGiay,dm.id AS danhMuc
            ,h.id AS hang,o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai
            FROM chi_tiet_san_pham o
            JOIN san_pham sp  on o.san_pham_id=sp.id
            JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
            JOIN mau_sac ms  on o.mau_sac_id=ms.id
            JOIN chat_lieu cl  on o.chat_lieu_id=cl.id
            JOIN de_giay dc  on o.de_giay_id=dc.id
            JOIN danh_muc dm  on o.danh_muc_id=dm.id
            JOIN hang h  on o.hang_id=h.id
            WHERE o.id=:idCT
                     """, nativeQuery = true)
    DetailCTSPRespone detailCTSP(@Param("idCT") String idCT);

    @Query(value = """
            SELECT o.id AS id,o.mo_ta AS moTa ,sp.id AS sanPham,sp.ten AS tenSP ,kt.id AS kichThuoc,ms.id AS mauSac,cl.id AS chatLieu,dc.id AS deGiay,dm.id AS danhMuc
            ,h.id AS hang,o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai
            FROM chi_tiet_san_pham o
            JOIN san_pham sp  on o.san_pham_id=sp.id
            JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
            JOIN mau_sac ms  on o.mau_sac_id=ms.id
            JOIN chat_lieu cl  on o.chat_lieu_id=cl.id
            JOIN de_giay dc  on o.de_giay_id=dc.id
            JOIN danh_muc dm  on o.danh_muc_id=dm.id
            JOIN hang h  on o.hang_id=h.id
                     """, nativeQuery = true)
    List<DetailCTSPRespone> detail();

    @Query(value = """
            SELECT distinct o.id AS idCTSP,MIN(ha.url) AS linkAnh ,sp.ten AS tenSP ,kt.ten AS tenKT,ms.ten AS tenMS,ms.ma AS maMS,
             o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai, km.ten as tenKM , km.gia_tri_khuyen_mai as giaKhuyenMai , km.loai as loaiKM
             FROM duanmishoes.chi_tiet_san_pham o
             JOIN duanmishoes.san_pham sp  on o.san_pham_id=sp.id
             JOIN duanmishoes.kich_thuoc kt  on o.kich_thuoc_id=kt.id
             JOIN duanmishoes.mau_sac ms  on o.mau_sac_id=ms.id
             JOIN duanmishoes.hinh_anh ha on o.id=ha.chi_tiet_san_pham_id 
             LEFT JOIN duanmishoes.khuyen_mai km on o.khuyen_mai_id = km.id
             where o.trang_thai =0
             group by o.id
            """, nativeQuery = true)
    List<ChiTietSanPhamForBanHang> getALLCTSPBanHang();


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
    List<AdminCTSPForKhuyenMai> getCTSPBySP(@Param("idSP") String idSP);

    @Query(value = "select ctsp.id from chi_tiet_san_pham ctsp left join khuyen_mai km on ctsp.khuyen_mai_id = km.id where ctsp.khuyen_mai_id =:idKM", nativeQuery = true)
    List<String> getCTSPByKM(String idKM);

    @Query(value = """
                        SELECT o.id AS idCTSP,ha.url AS linkAnh,o.mo_ta AS moTa ,sp.ten AS tenSP ,kt.ten AS tenKT,ms.ma AS maMS,ms.ten AS tenMS,cl.ten AS tenCL,dc.ten AS tenDC,dm.ten AS tenDM
                        ,h.ten AS tenH,o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai
                        FROM chi_tiet_san_pham o
                        JOIN san_pham sp  on o.san_pham_id=sp.id
                        JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
                        JOIN mau_sac ms  on o.mau_sac_id=ms.id
                        JOIN chat_lieu cl  on o.chat_lieu_id=cl.id
                        JOIN de_giay dc  on o.de_giay_id=dc.id
                        JOIN danh_muc dm  on o.danh_muc_id=dm.id
                        JOIN hang h  on o.hang_id=h.id
                        JOIN hinh_anh ha on o.id=ha.chi_tiet_san_pham_id    
                        WHERE                                                                 
                        ((:#{#ctspSearch.tenCT} IS NULL OR sp.ten LIKE (%:#{#ctspSearch.tenCT}%) ) AND
                        (:#{#ctspSearch.idKT} IS NULL OR o.kich_thuoc_id =:#{#ctspSearch.idKT} ) AND
                        (:#{#ctspSearch.idMS} IS NULL OR o.mau_sac_id =:#{#ctspSearch.idMS} ) AND
                        (:#{#ctspSearch.idCL} IS NULL OR o.chat_lieu_id =:#{#ctspSearch.idCL} ) AND
                        (:#{#ctspSearch.idDC} IS NULL OR o.de_giay_id =:#{#ctspSearch.idDC} ) AND
                        (:#{#ctspSearch.idDM} IS NULL OR o.danh_muc_id =:#{#ctspSearch.idDM} ) AND
                        (:#{#ctspSearch.idH} IS NULL OR o.hang_id =:#{#ctspSearch.idH} ) AND
                        (:#{#ctspSearch.trangThaiCT} IS NULL OR o.trang_thai =:#{#ctspSearch.trangThaiCT}) AND
                        (:#{#ctspSearch.soLuongCT} IS NULL OR o.so_luong <=:#{#ctspSearch.soLuongCT} OR o.so_luong > 0) AND
                        (:#{#ctspSearch.giaBanCT} IS NULL OR o.gia_ban <=:#{#ctspSearch.giaBanCT} OR o.gia_ban > 0)) 
                        AND o.san_pham_id = :idSP
                                 """, nativeQuery = true)
    List<CTSPSearchRespone> getTim(@Param("idSP") String idSP, CTSPSearch ctspSearch);

    // sản phẩm client
    @Query(value = """
                 SELECT o.id AS id,o.mo_ta AS moTa ,sp.id AS sanPhamID,sp.ten AS tenSP ,kt.id AS kichThuocID,ms.id AS mauSacID,cl.id AS chatLieuID, cl.ten as tenCL,dc.id AS deGiayID,dc.ten as tenDeGiay,dm.id AS danhMucID
                     ,dm.ten as tenDM,h.id AS hangID,h.ten as tenHang,o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai,o.ghi_chu as anh,o.khuyen_mai_id as khuyenMaiID
                     FROM chi_tiet_san_pham o
                     JOIN san_pham sp  on o.san_pham_id=sp.id
                     JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
                     JOIN mau_sac ms  on o.mau_sac_id=ms.id
                     JOIN chat_lieu cl  on o.chat_lieu_id=cl.id
                     JOIN de_giay dc  on o.de_giay_id=dc.id
                     JOIN danh_muc dm  on o.danh_muc_id=dm.id
                     JOIN hang h  on o.hang_id=h.id
                     WHERE o.id=:idCT
                     """, nativeQuery = true)
    DetailCTSPClientRespon detailCTSPClient(@Param("idCT") String idCT);

    //list mau sac by sp client
    @Query(value = """
                SELECT distinct mau_sac.id as mauSacID, mau_sac.ma as maMau FROM chi_tiet_san_pham
                 join san_pham on chi_tiet_san_pham.san_pham_id = san_pham.id
                  join mau_sac on chi_tiet_san_pham.mau_sac_id =mau_sac.id where san_pham_id=:idSP
                     """, nativeQuery = true)
    List<ListMauSacBySPClientRespon> listMauSacBySPClient(@Param("idSP") String idSP);

    //list size by sp client
    @Query(value = """
                 SELECT distinct kich_thuoc.id as kichThuocID, kich_thuoc.ten as tenKichThuoc FROM chi_tiet_san_pham
                   join san_pham on chi_tiet_san_pham.san_pham_id = san_pham.id
                    join kich_thuoc on chi_tiet_san_pham.kich_thuoc_id =kich_thuoc.id  where san_pham_id=:idSP order by kich_thuoc.ten
                     """, nativeQuery = true)
    List<ListSizeBySPClientRespon> listSizeBySPClient(@Param("idSP") String idSP);
}

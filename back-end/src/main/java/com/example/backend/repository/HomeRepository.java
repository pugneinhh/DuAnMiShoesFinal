package com.example.backend.repository;

import com.example.backend.dto.response.HangRespone;
import com.example.backend.dto.response.sanpham.HomeRespone;
import com.example.backend.entity.ChiTietSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HomeRepository extends JpaRepository<ChiTietSanPham, String> {

    @Query(value = """
            select
                ctsp.san_pham_id as idSanPham,
                ctsp.id as idCt,
            	sp.ten as name,
            	kt.ten as size,
            	ms.ten as color,
            	ms.ma as colorCode,
            	ctsp.gia_ban as price,
            	ctsp.ghi_chu as image,
            	ctsp.ghi_chu as hoverImage
            from
            	chi_tiet_san_pham ctsp
            join san_pham sp on
            	ctsp.san_pham_id = sp.id
            join mau_sac ms on
            	ctsp.mau_sac_id = ms.id
            join kich_thuoc kt on
            	ctsp.kich_thuoc_id = kt.id
            group by
            	ctsp.gia_ban,
            	ms.ten,
            	sp.ten,
            	kt.ten,
            	ctsp.ghi_chu,
            	ctsp.id,
            	ms.ma
            """, nativeQuery = true)
    List<HomeRespone> getALLSanPham();

    @Query(value = """
            select
                ctsp.san_pham_id as idSanPham,
                ctsp.id as idCt,
            	sp.ten as name,
            	kt.ten as size,
            	ms.ten as color,
            	ms.ma as colorCode,
            	ctsp.gia_ban as price,
            	ctsp.ghi_chu as image,
            	ctsp.ghi_chu as hoverImage
            from
            	chi_tiet_san_pham ctsp
            join san_pham sp on
            	ctsp.san_pham_id = sp.id
            join mau_sac ms on
            	ctsp.mau_sac_id = ms.id
            join kich_thuoc kt on
            	ctsp.kich_thuoc_id = kt.id
            group by
            	ctsp.gia_ban,
            	ms.ten,
            	sp.ten,
            	kt.ten,
            	ctsp.ghi_chu,
            	ctsp.id,
            	ms.ma
            order by ctsp.ngay_tao desc
            limit 8
            """, nativeQuery = true)
    List<HomeRespone> getALLSanPhamNew();

    @Query(value = """
            select
            	ctsp.san_pham_id as idSanPham,
            	ctsp.id as idCt,
            	sp.ten as name,
            	kt.ten as size,
            	ms.ten as color,
            	ms.ma as colorCode,
            	ctsp.gia_ban as price,
            	ctsp.ghi_chu as image,
            	ctsp.ghi_chu as hoverImage
            from hoa_don_chi_tiet hdct \s
            join hoa_don hd  on\s
            hd.id=hdct.hoa_don_id
            join chi_tiet_san_pham ctsp on
            ctsp.id = hdct.chi_tiet_san_pham_id\s
            join san_pham sp on
            	ctsp.san_pham_id = sp.id
            join mau_sac ms on
            	ctsp.mau_sac_id = ms.id
            join kich_thuoc kt on
            	ctsp.kich_thuoc_id = kt.id
            where
            	year(hdct.ngay_tao) = year(CURDATE())
            	and (hd.trang_thai = 4
            		or hd.trang_thai = 5)
            group by
            	ctsp.gia_ban,
            	ms.ten,
            	sp.ten,
            	kt.ten,
            	ctsp.ghi_chu,
            	ctsp.id,
            	ms.ma
                 """, nativeQuery = true)
    List<HomeRespone> getHotSale();
}

package com.example.backend.repository;

import com.example.backend.dto.request.sanphamsearch.SanPhamSearch;
import com.example.backend.dto.response.DanhMucRespone;
import com.example.backend.dto.response.MauSacRespone;
import com.example.backend.entity.DanhMuc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DanhMucRepository extends JpaRepository<DanhMuc, String> {
    @Query(value = """
    SELECT dm.id as id,dm.ma as ma ,dm.ten as ten, dm.trang_thai as trangThai FROM danh_muc dm ORDER BY dm.ma ASC 
            """, nativeQuery = true)
    List<DanhMucRespone> getALLDM();

    @Query(value = """
    SELECT o.id as id,o.ma as ma ,o.ten as ten, o.trang_thai as trangThai FROM danh_muc o WHERE 
     (:#{#sanPhamSearch.ten} IS NULL OR o.ma LIKE (%:#{#sanPhamSearch.ten}%) OR o.ten LIKE (%:#{#sanPhamSearch.ten}%) ) AND
     ( :#{#sanPhamSearch.trangThai} IS NULL OR o.trang_thai=:#{#sanPhamSearch.trangThai})
    ORDER BY o.ma DESC
            """, nativeQuery = true)
    List<DanhMucRespone> tim(SanPhamSearch sanPhamSearch);
}

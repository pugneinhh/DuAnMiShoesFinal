package com.example.backend.repository;

import com.example.backend.entity.DanhMuc;
import com.example.backend.model.AdminDanhMucRespon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DanhMucRepository extends JpaRepository<DanhMuc, String> {
    @Query(value = """
    SELECT dm.ma as ma ,dm.ten as ten, dm.trang_thai as trangThai FROM danh_muc dm ORDER BY dm.ma ASC 
            """, nativeQuery = true)
    List<AdminDanhMucRespon> getALLDM();
    @Query(value = """
    SELECT dm.ma as ma ,dm.ten as ten, dm.trang_thai as trangThai FROM danh_muc dm WHERE dm.ma LIKE %:key% OR dm.ten LIKE %:key% AND dm.trang_thai=:timTT ORDER BY dm.ma ASC
            """, nativeQuery = true)
    List<AdminDanhMucRespon> timDM(@Param("key") String key,@Param("timTT") int timTT);
}

package com.example.duanmishoes.respon;

import com.example.duanmishoes.entity.DanhMuc;
import com.example.duanmishoes.model.AdminDanhMucRespon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface DanhMucRespon extends JpaRepository<DanhMuc, String> {
    @Query(value = """
    SELECT dm.ma as ma ,dm.ten as ten, dm.trang_thai as trangThai FROM danh_muc dm ORDER BY dm.ma ASC 
            """, nativeQuery = true)
    List<AdminDanhMucRespon> getALLDM();
    @Query(value = """
    SELECT dm.ma as ma ,dm.ten as ten, dm.trang_thai as trangThai FROM danh_muc dm WHERE dm.ma LIKE %:key% OR dm.ten LIKE %:key% AND dm.trang_thai=:timTT ORDER BY dm.ma ASC
            """, nativeQuery = true)
    List<AdminDanhMucRespon> timDM(@Param("key") String key,@Param("timTT") int timTT);
}

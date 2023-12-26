package com.example.duanmishoes.respon;

import com.example.duanmishoes.entity.KichThuoc;
import com.example.duanmishoes.model.AdminKichThuocRespon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface KichThuocRespon extends JpaRepository<KichThuoc, String> {
    @Query(value = """
    SELECT o.id as id,o.ma as ma ,o.ten as ten, o.trang_thai as trangThai FROM kich_thuoc o ORDER BY o.ma ASC
            """, nativeQuery = true)
    List<AdminKichThuocRespon> getALLKT();
}

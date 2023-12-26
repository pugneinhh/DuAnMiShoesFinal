package com.example.duanmishoes.respon;

import com.example.duanmishoes.entity.Hang;
import com.example.duanmishoes.model.AdminHangRespon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface HangRespon extends JpaRepository<Hang, String> {
    @Query(value = """
    SELECT o.ma as ma ,o.ten as ten, o.trang_thai as trangThai FROM hang o ORDER BY o.ma ASC
            """, nativeQuery = true)
    List<AdminHangRespon> getALLH();
}

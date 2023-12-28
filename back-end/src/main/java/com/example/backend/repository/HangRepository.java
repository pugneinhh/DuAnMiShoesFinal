package com.example.backend.repository;

import com.example.backend.dto.response.HangRespone;
import com.example.backend.entity.Hang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HangRepository extends JpaRepository<Hang, String> {
    @Query(value = """
    SELECT o.ma as ma ,o.ten as ten, o.trang_thai as trangThai FROM hang o ORDER BY o.ma ASC
            """, nativeQuery = true)
    List<HangRespone> getALLH();
}

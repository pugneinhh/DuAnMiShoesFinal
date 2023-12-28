package com.example.backend.repository;

import com.example.backend.dto.response.DeGiayRespone;
import com.example.backend.entity.DeGiay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DeGiayRepository extends JpaRepository<DeGiay, String> {
    @Query(value = """
    SELECT o.ma as ma ,o.ten as ten, o.trang_thai as trangThai FROM de_giay o ORDER BY o.ma ASC
            """, nativeQuery = true)
    List<DeGiayRespone> getALLDC();
}

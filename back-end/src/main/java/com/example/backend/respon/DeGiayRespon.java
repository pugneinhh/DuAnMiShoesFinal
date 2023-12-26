package com.example.backend.respon;

import com.example.backend.entity.DeGiay;
import com.example.backend.model.AdminDoCaoRespon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface DeGiayRespon extends JpaRepository<DeGiay, String> {
    @Query(value = """
    SELECT o.ma as ma ,o.ten as ten, o.trang_thai as trangThai FROM do_cao o ORDER BY o.ma ASC
            """, nativeQuery = true)
    List<AdminDoCaoRespon> getALLDC();
}

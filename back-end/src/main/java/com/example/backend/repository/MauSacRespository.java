package com.example.backend.repository;
import com.example.backend.dto.response.MauSacRespone;
import com.example.backend.entity.MauSac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MauSacRespository extends JpaRepository<MauSac, String> {
    @Query(value = """
    SELECT 
    o.id as id,
    o.ma as ma ,
         o.ten as ten,
         o.trang_thai as trangThai
      FROM mau_sac o ORDER BY o.ma ASC
            """, nativeQuery = true)
    List<MauSacRespone> getALLMS();
}

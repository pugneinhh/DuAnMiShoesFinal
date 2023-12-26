package com.example.backend.respon;
import com.example.backend.dto.respone.MauSacRespone;
import com.example.backend.entity.MauSac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MauSacRespository extends JpaRepository<MauSac, String> {
    @Query(value = """
    SELECT o.ma as ma ,
         o.ten as ten,
         o.trang_thai as trangThai
      FROM mau_sac o ORDER BY o.ma ASC
            """, nativeQuery = true)
    List<MauSacRespone> getALLMS();
}

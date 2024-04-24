package com.example.backend.repository;

import com.example.backend.entity.HinhAnh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HinhAnhRepository extends JpaRepository<HinhAnh,String> {
    @Query(value = """
            SELECT * FROM duanmishoes.hinh_anh where ten=:tenAnh AND
            chi_tiet_san_pham_id=:idSP order by ngay_tao DESC;
            """, nativeQuery = true)
    List<HinhAnh> getAnhCTSP(String tenAnh,String idSP);
    List<HinhAnh> findHinhAnhsByTenOrderByNgayTaoDesc(String ten);
}

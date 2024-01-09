package com.example.backend.repository;

import com.example.backend.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface DiaChiRepository extends JpaRepository<DiaChi, String> {
    @Query(value = "SELECT * FROM dia_chi a WHERE a.trang_thai = 0 AND a.nguoi_dung_id =:id",nativeQuery = true)
    DiaChi findByUserAndStatus (@Param("id") String user);
}

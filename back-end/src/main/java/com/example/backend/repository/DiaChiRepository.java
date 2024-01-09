package com.example.backend.repository;

import com.example.backend.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface DiaChiRepository extends JpaRepository<DiaChi, UUID> {
    @Query("SELECT a FROM DiaChi a WHERE a.trangThai = 0 AND a.id =:id")
    DiaChi findByUserAndStatus (@Param("id") String user);
}

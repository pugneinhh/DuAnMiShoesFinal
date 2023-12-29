package com.example.backend.respon;

import com.example.backend.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DiaChiRespon extends JpaRepository<DiaChi, UUID> {
}

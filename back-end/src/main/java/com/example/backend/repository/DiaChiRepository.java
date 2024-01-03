package com.example.backend.repository;

import com.example.backend.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DiaChiRepository extends JpaRepository<DiaChi, UUID> {
}

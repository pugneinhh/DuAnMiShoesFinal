package com.example.backend.repository;

import com.example.backend.entity.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NguoiDungRepository extends JpaRepository<NguoiDung,String> {

}

package com.example.backend.service;

import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminNhanVienRespon;
import com.example.backend.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NhanVienService {
    @Autowired
    NguoiDungRepository nguoiDungRepository;

    public List<AdminNhanVienRespon> getAll(){
        return nguoiDungRepository.getAllNhanVien();
    }

    public NguoiDung addNhanVien(NguoiDung nd){
        return nguoiDungRepository.save(nd);
    }
}

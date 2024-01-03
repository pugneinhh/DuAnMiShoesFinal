package com.example.backend.service;

import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminKhachHangRepon;
import com.example.backend.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhachHangService {
    @Autowired
    NguoiDungRepository nguoiDungRepository;

    public List<AdminKhachHangRepon> getAll(){
        return  nguoiDungRepository.getAllKhachHang();
    }

    public NguoiDung addKhachHang(NguoiDung nd){
        return nguoiDungRepository.save(nd);
    }
}

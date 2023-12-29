package com.example.backend.service;

import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminNhanVienRespon;
import com.example.backend.respon.NguoiDungRespon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NhanVienService {
    @Autowired
    NguoiDungRespon nguoiDungRespon;

    public List<AdminNhanVienRespon> getAll(){
        return nguoiDungRespon.getAllNhanVien();
    }

    public NguoiDung addNhanVien(NguoiDung nd){
        return nguoiDungRespon.save(nd);
    }
}

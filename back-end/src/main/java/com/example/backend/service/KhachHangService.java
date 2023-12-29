package com.example.backend.service;

import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminKhachHangRepon;
import com.example.backend.respon.NguoiDungRespon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhachHangService {
    @Autowired
    NguoiDungRespon nguoiDungRespon;

    public List<AdminKhachHangRepon> getAll(){
        return  nguoiDungRespon.getAllKhachHang();
    }

    public NguoiDung addKhachHang(NguoiDung nd){
        return nguoiDungRespon.save(nd);
    }
}

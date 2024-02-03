package com.example.backend.service;

import com.example.backend.dto.impldto.NhanVienResponseImplDTO;

import com.example.backend.dto.response.KhachHangRespon;
import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminKhachHangRepon;
import com.example.backend.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NguoiDungService {
    @Autowired
    NguoiDungRepository nguoiDungRepository;
    public List<NguoiDung> getAll(){
        return nguoiDungRepository.findAll();
    }
}

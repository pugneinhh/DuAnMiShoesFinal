package com.example.backend.service;

import com.example.backend.dto.response.ChiTietSanPhamRespone;
import com.example.backend.model.AdminBanHangHDRespon;
import com.example.backend.repository.CTSPRepository;
import com.example.backend.repository.HoaDonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BanHangService {
    @Autowired
    HoaDonRepository hoaDonRepository;
    @Autowired
    CTSPRepository ctspRepository;

    public List<AdminBanHangHDRespon> HoaDonBanHang(){
        return  hoaDonRepository.HoaDonBanHang();
    }
   public List<ChiTietSanPhamRespone> getALLCTSPBanHang(){
        return ctspRepository.getALLCTSPBanHang();
    }
}

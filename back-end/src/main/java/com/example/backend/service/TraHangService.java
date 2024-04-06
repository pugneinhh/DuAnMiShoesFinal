package com.example.backend.service;

import com.example.backend.dto.response.HoaDonChiTietBanHangRespone;
import com.example.backend.entity.HoaDon;
import com.example.backend.repository.HoaDonChiTietRepository;
import com.example.backend.repository.HoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TraHangService {
    @Autowired
    HoaDonRepository  hoaDonRepository;
    @Autowired
    HoaDonChiTietRepository hoaDonChiTietRepository;

    public List<HoaDonChiTietBanHangRespone> getAllHDCTByHoaDon(String ma){
        HoaDon hoaDon=hoaDonRepository.getHDByMa(ma);
        if(hoaDon!=null){
            List<HoaDonChiTietBanHangRespone> list=hoaDonChiTietRepository.getAllHDCTByHD(hoaDon.getId());
            return list;
        }
        return null;
    }
}

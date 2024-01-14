package com.example.backend.service;

import com.example.backend.dto.request.HoaDonChiTietRequest;
import com.example.backend.dto.response.HoaDonChiTietRespone;
import com.example.backend.entity.HoaDonChiTiet;
import com.example.backend.repository.HoaDonChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoaDonChiTietService {
    @Autowired
    HoaDonChiTietRepository hoaDonChiTietRepository;
    public List<HoaDonChiTietRespone> getAllHDCTByHD(String id){
        return hoaDonChiTietRepository.getAllHDCTByHD(id);
    }
    public HoaDonChiTietRespone getOneHDCT(String idHD,String idCTSP){
        return hoaDonChiTietRepository.getOneHDCT(idHD,idCTSP);
    }
    public HoaDonChiTiet addHDCT(HoaDonChiTietRequest request){
        HoaDonChiTiet hdct=request.map(new HoaDonChiTiet());
        return  hoaDonChiTietRepository.save(hdct);
    }
}

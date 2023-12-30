package com.example.backend.service;
import com.example.backend.dto.response.ChiTietSanPhamRespone;
import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.entity.KhuyenMai;
import com.example.backend.model.*;
import com.example.backend.repository.CTSPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class CTSPService {
    @Autowired
    CTSPRepository ctspRepository;
    @Autowired
    KhuyenMaiService khuyenMaiService;
    public List<ChiTietSanPham> getALL(){
        return ctspRepository.findAll();
    }
    public List<ChiTietSanPhamRespone> getALLCTSP(String id){
        return ctspRepository.getALLCTSP(id);
    }

    public List<String> getALLCTSPByKM(String id){
        return ctspRepository.getAllCTSPByKM(id);
    }


    public ChiTietSanPham updateKM(String idCTSP , KhuyenMai km){
        ChiTietSanPham ctsp = ctspRepository.getReferenceById(idCTSP);
        ctsp.setKhuyenMai(km);
        ctsp.setNgaySua(LocalDateTime.now());
        System.out.println("khuyến mại"+ctsp.getKhuyenMai());
        return ctspRepository.save(ctsp);
    }

    public List<AdminCTSPForKhuyenMai> getAllCTSPByIDSP(String idSP){
        return ctspRepository.getCTSPBySP(idSP);
    }

    public List<String> getCTSPByKM(String idKM){
        return  ctspRepository.getCTSPByKM(idKM);
    }

    public ChiTietSanPham deleteKM(String idCTSP){
        ChiTietSanPham ctsp = ctspRepository.getReferenceById(idCTSP);
        ctsp.setKhuyenMai(null);
        ctsp.setNgaySua(LocalDateTime.now());
        return ctspRepository.save(ctsp);
    }
}

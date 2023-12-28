package com.example.backend.service;
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
    public List<AdminCTSPRespon> getALLCTSP(UUID id){
        return ctspRepository.getALLCTSP(id);
    }

    public List<UUID> getALLCTSPByKM(UUID id){
        return ctspRepository.getAllCTSPByKM(id);
    }


    public ChiTietSanPham updateKM(String idCTSP , KhuyenMai km){
        ChiTietSanPham ctsp = ctspRepository.getReferenceById(idCTSP);
        ctsp.setKhuyenMai(km);
        ctsp.setNgaySua(LocalDateTime.now());
        System.out.println("khuyến mại"+ctsp.getKhuyenMai());
        return ctspRepository.save(ctsp);
    }


}

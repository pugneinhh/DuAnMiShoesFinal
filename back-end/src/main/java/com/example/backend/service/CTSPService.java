package com.example.duanmishoes.service;

import com.example.duanmishoes.entity.ChiTietSanPham;
import com.example.duanmishoes.entity.KhuyenMai;
import com.example.duanmishoes.model.*;
import com.example.duanmishoes.respon.CTSPRespon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class CTSPService {
    @Autowired
    CTSPRespon ctspRespon;
    @Autowired
    KhuyenMaiService khuyenMaiService;
    public List<ChiTietSanPham> getALL(){
        return ctspRespon.findAll();
    }
    public List<AdminCTSPRespon> getALLCTSP(UUID id){
        return ctspRespon.getALLCTSP(id);
    }

    public List<UUID> getALLCTSPByKM(UUID id){
        return ctspRespon.getAllCTSPByKM(id);
    }


    public ChiTietSanPham updateKM(String idCTSP , KhuyenMai km){
        ChiTietSanPham ctsp = ctspRespon.getReferenceById(idCTSP);
        ctsp.setKhuyenMai(km);
        ctsp.setNgaySua(LocalDateTime.now());
        System.out.println("khuyến mại"+ctsp.getKhuyenMai());
        return ctspRespon.save(ctsp);
    }


}

package com.example.duanmishoes.service;

import com.example.duanmishoes.entity.SanPham;
import com.example.duanmishoes.model.AdminSanPhamRespon;
import com.example.duanmishoes.respon.SanPhamRespon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SanPhamService {
    @Autowired
    SanPhamRespon sanPhamRespon;
    public List<SanPham> getALL(){
        return sanPhamRespon.findAll();
    }
    public List<AdminSanPhamRespon> getALLSP(){
        System.out.println(sanPhamRespon.getALLSP().get(0).getTrangThai());
        return sanPhamRespon.getALLSP();
    }


    public boolean existByID(String id){
        return sanPhamRespon.existsById(id);
    }

    public void deleteByID(String id){
         sanPhamRespon.deleteById(id);
    }

    public SanPham addSP(SanPham sp){return sanPhamRespon.save(sp);}

    public UUID getSPByCTSP(UUID id){
        return sanPhamRespon.getIDSPbyCTSP(id);
    }
}

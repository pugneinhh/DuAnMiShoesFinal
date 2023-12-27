package com.example.backend.service;
import com.example.backend.entity.SanPham;
import com.example.backend.model.AdminSanPhamRespon;
import com.example.backend.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SanPhamService {
    @Autowired
    SanPhamRepository sanPhamRepository;
    public List<SanPham> getALL(){
        return sanPhamRepository.findAll();
    }
    public List<AdminSanPhamRespon> getALLSP(){
        System.out.println(sanPhamRepository.getALLSP().get(0).getTrangThai());
        return sanPhamRepository.getALLSP();
    }


    public boolean existByID(String id){
        return sanPhamRepository.existsById(id);
    }

    public void deleteByID(String id){
         sanPhamRepository.deleteById(id);
    }

    public SanPham addSP(SanPham sp){return sanPhamRepository.save(sp);}

    public UUID getSPByCTSP(UUID id){
        return sanPhamRepository.getIDSPbyCTSP(id);
    }
}

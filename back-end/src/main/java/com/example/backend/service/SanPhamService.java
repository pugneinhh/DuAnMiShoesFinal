package com.example.backend.service;
import com.example.backend.dto.request.sanphamsearch.BangConSearch;
import com.example.backend.dto.request.sanphamsearch.SanPhamSearch;
import com.example.backend.dto.response.DanhMucRespone;
import com.example.backend.dto.response.SanPhamRespone;
import com.example.backend.entity.SanPham;
import com.example.backend.model.AdminSanPhamRespon;
import com.example.backend.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.SimpleTimeZone;
import java.util.UUID;

@Service
public class SanPhamService {
    @Autowired
    SanPhamRepository sanPhamRepository;
    public List<SanPham> getALL(){
        return sanPhamRepository.findAll();
    }
    public List<SanPhamRespone> getALLSP(){
        return sanPhamRepository.getALLSP();
    }

    public List<SanPhamRespone> getTim(SanPhamSearch sanPhamSearch) {
        return sanPhamRepository.tim(sanPhamSearch);
    }

    public boolean existByID(String id){
        return sanPhamRepository.existsById(id);
    }

    public void deleteByID(String id){
         sanPhamRepository.deleteById(id);
    }

    public SanPham addSP(SanPham sp){return sanPhamRepository.save(sp);}

    public List<String>  getSPByCTSP(String id){
        return sanPhamRepository.getIDSPbyCTSP(id);
    }
}

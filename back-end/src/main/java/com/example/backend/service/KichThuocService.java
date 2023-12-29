package com.example.backend.service;
import com.example.backend.dto.request.KichThuocRequest;
import com.example.backend.dto.response.KichThuocRespone;
import com.example.backend.entity.KichThuoc;
import com.example.backend.repository.KichThuocRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KichThuocService {
    @Autowired
    KichThuocRepository kichThuocRepository;
    public List<KichThuoc> getALL(){
        return kichThuocRepository.findAll();
    }
    public List<KichThuocRespone> getALLKT(){
        return kichThuocRepository.getALLKT();
    }
    public String addKT(KichThuocRequest kt){
        KichThuoc kichThuoc = KichThuoc.builder()
                .ma(kt.getMa())
                .ten(kt.getTen())
                .ngayTao(kt.getNgayTao())
                .trangThai(1)
                .build();
        kichThuocRepository.save(kichThuoc);
        return "Done";
    }
}

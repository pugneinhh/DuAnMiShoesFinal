package com.example.backend.service;
import com.example.backend.entity.KichThuoc;
import com.example.backend.model.AdminKichThuocRespon;
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
    public List<AdminKichThuocRespon> getALLKT(){
        return kichThuocRepository.getALLKT();
    }
    public KichThuoc addKT(KichThuoc kt){return kichThuocRepository.save(kt);}
}

package com.example.duanmishoes.service;

import com.example.duanmishoes.entity.KichThuoc;
import com.example.duanmishoes.model.AdminKichThuocRespon;
import com.example.duanmishoes.respon.KichThuocRespon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KichThuocService {
    @Autowired
    KichThuocRespon kichThuocRespon;
    public List<KichThuoc> getALL(){
        return kichThuocRespon.findAll();
    }
    public List<AdminKichThuocRespon> getALLKT(){
        return kichThuocRespon.getALLKT();
    }
    public KichThuoc addKT(KichThuoc kt){return kichThuocRespon.save(kt);}
}

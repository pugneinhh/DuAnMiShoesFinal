package com.example.backend.service;
import com.example.backend.entity.KichThuoc;
import com.example.backend.model.AdminKichThuocRespon;
import com.example.backend.respon.KichThuocRespon;
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

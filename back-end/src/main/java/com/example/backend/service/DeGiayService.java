package com.example.backend.service;
import com.example.backend.entity.DeGiay;
import com.example.backend.model.AdminDoCaoRespon;
import com.example.backend.repository.DeGiayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeGiayService {
    @Autowired
    private DeGiayRepository doCaoRespon;
    public List<DeGiay> getALL(){
        return doCaoRespon.findAll();
    }
    public List<AdminDoCaoRespon> getALLDC(){
        return doCaoRespon.getALLDC();
    }
    public DeGiay addDC(DeGiay dc){return doCaoRespon.save(dc);}
}

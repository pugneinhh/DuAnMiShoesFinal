package com.example.duanmishoes.service;

import com.example.duanmishoes.entity.DeGiay;
import com.example.duanmishoes.model.AdminDoCaoRespon;
import com.example.duanmishoes.respon.DeGiayRespon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeGiayService {
    @Autowired
    private DeGiayRespon doCaoRespon;
    public List<DeGiay> getALL(){
        return doCaoRespon.findAll();
    }
    public List<AdminDoCaoRespon> getALLDC(){
        return doCaoRespon.getALLDC();
    }
    public DeGiay addDC(DeGiay dc){return doCaoRespon.save(dc);}
}

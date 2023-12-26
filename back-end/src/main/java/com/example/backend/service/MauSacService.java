package com.example.duanmishoes.service;

import com.example.duanmishoes.dto.request.MauSacRequest;
import com.example.duanmishoes.dto.respone.MauSacRespone;
import com.example.duanmishoes.entity.MauSac;
import com.example.duanmishoes.respon.MauSacRespository;
import com.example.duanmishoes.util.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MauSacService {
    @Autowired
    MauSacRespository mauSacRespon;

    public List<MauSac> getALL(){
        return mauSacRespon.findAll();
    }
    public List<MauSacRespone> getALLMS(){
        return mauSacRespon.getALLMS();
    }
    public String addMS(MauSacRequest request){
        MauSac mauSac = MauSac.builder()
                .ma(request.getMa())
                .ten(request.getTen())
                .trangThai(Status.DANG_SU_DUNG)
                .build();
        mauSacRespon.save(mauSac);
        return "okkk";}
}

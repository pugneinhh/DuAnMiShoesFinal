package com.example.backend.service;
import com.example.backend.dto.request.MauSacRequest;
import com.example.backend.dto.response.MauSacRespone;
import com.example.backend.entity.MauSac;
import com.example.backend.repository.MauSacRespository;
import com.example.backend.util.Status;
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

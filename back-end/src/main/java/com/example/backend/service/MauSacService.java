package com.example.backend.service;
import com.example.backend.dto.request.sanpham.KichThuocRequest;
import com.example.backend.dto.request.sanpham.MauSacRequest;
import com.example.backend.dto.request.sanphamsearch.BangConSearch;
import com.example.backend.dto.response.sanpham.MauSacRespone;
import com.example.backend.entity.KichThuoc;
import com.example.backend.entity.MauSac;
import com.example.backend.repository.MauSacRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MauSacService {
    @Autowired
    MauSacRespository mauSacRespository;

    public List<MauSac> getALL(){
        return mauSacRespository.findAll();
    }
    public List<MauSacRespone> getALLMS(){
        return mauSacRespository.getALLMS();
    }

    public MauSac update(String id, MauSacRequest request) {
        MauSac msFirst = mauSacRespository.findById(id).get();
        MauSac ms = request.mapMS(new MauSac());
        ms.setNgayTao(msFirst.getNgayTao());
        ms.setNgaySua(LocalDateTime.now());
        ms.setId(id);
        return mauSacRespository.save(ms);
    }

    public MauSac detailMS(String id){return mauSacRespository.findById(id).get();}

    public List<MauSacRespone> getTim(BangConSearch bangConSearch) {
        return mauSacRespository.tim(bangConSearch);
    }

    public String addMS(MauSacRequest ms){
        MauSac mauSac = MauSac.builder()
                .ma(ms.getMa())
                .ten(ms.getTen())
                .ngayTao(LocalDateTime.now())
                .trangThai(0)
                .build();
        mauSacRespository.save(mauSac);
        return "Done";}
}

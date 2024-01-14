package com.example.backend.service;
import com.example.backend.dto.request.MauSacRequest;
import com.example.backend.dto.request.sanphamsearch.SanPhamSearch;
import com.example.backend.dto.response.MauSacRespone;
import com.example.backend.entity.MauSac;
import com.example.backend.entity.Voucher;
import com.example.backend.repository.MauSacRespository;
import com.example.backend.util.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public MauSac detailMS(String id){return mauSacRespository.findById(id).get();}

    public List<MauSacRespone> getTim(SanPhamSearch sanPhamSearch) {
        return mauSacRespository.tim(sanPhamSearch);
    }

    public String addMS(MauSacRequest ms){
        MauSac mauSac = MauSac.builder()
                .ma(ms.getMa())
                .ten(ms.getTen())
                .ngayTao(ms.getNgayTao())
                .trangThai(0)
                .build();
        mauSacRespository.save(mauSac);
        return "Done";}
}

package com.example.backend.service;
import com.example.backend.entity.KhuyenMai;
import com.example.backend.respon.KhuyenMaiRespon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Service
public class KhuyenMaiService {
    @Autowired
    KhuyenMaiRespon khuyenMaiRespon;

    public List<KhuyenMai> getAllKhuyenMai(){
        return khuyenMaiRespon.findAll();
    }

    public KhuyenMai addKhuyenMai(KhuyenMai km){
        return khuyenMaiRespon.save(km);
    }
    public KhuyenMai detailKhuyenMai(String id){return  khuyenMaiRespon.findById(id).get();}


    public LocalDateTime convertTime(LocalDateTime ldt0){
        ZoneId utc = ZoneId.of("UTC");
        ZoneId plus7Zone = ZoneId.of("Asia/Bangkok");
        ZonedDateTime utcZonedDateTime = ZonedDateTime.of(ldt0, utc);
        ZonedDateTime plus7ZonedDateTime = utcZonedDateTime.withZoneSameInstant(plus7Zone);
        LocalDateTime plus7DateTime = plus7ZonedDateTime.toLocalDateTime();
        return plus7DateTime;
    }
}

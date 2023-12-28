package com.example.backend.service;
import com.example.backend.repository.KhuyenMaiRepository;
import com.example.backend.entity.KhuyenMai;
import com.example.backend.repository.KhuyenMaiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Service
public class KhuyenMaiService {
    @Autowired
    KhuyenMaiRepository khuyenMaiRespone;

    public List<KhuyenMai> getAllKhuyenMai(){
        return khuyenMaiRespone.findAll();
    }

    public KhuyenMai addKhuyenMai(KhuyenMai km){
        return khuyenMaiRespone.save(km);
    }
    public KhuyenMai detailKhuyenMai(String id){return  khuyenMaiRespone.findById(id).get();}


    public LocalDateTime convertTime(LocalDateTime ldt0){
        ZoneId utc = ZoneId.of("UTC");
        ZoneId plus7Zone = ZoneId.of("Asia/Bangkok");
        ZonedDateTime utcZonedDateTime = ZonedDateTime.of(ldt0, utc);
        ZonedDateTime plus7ZonedDateTime = utcZonedDateTime.withZoneSameInstant(plus7Zone);
        LocalDateTime plus7DateTime = plus7ZonedDateTime.toLocalDateTime();
        return plus7DateTime;
    }

    public LocalDateTime convertTimeForUpdate(LocalDateTime ldt0){
        ZoneId utc = ZoneId.of("UTC");
        ZoneId apart7Zone = ZoneId.of("America/New_York");
        ZonedDateTime utcZonedDateTime = ZonedDateTime.of(ldt0, utc);
        ZonedDateTime apart7ZonedDateTime = utcZonedDateTime.withZoneSameInstant(apart7Zone);
        LocalDateTime apart7DateTime = apart7ZonedDateTime.toLocalDateTime();
        return apart7DateTime;
    }
}

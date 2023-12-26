package com.example.duanmishoes.controller;

import com.example.duanmishoes.entity.KhuyenMai;
import com.example.duanmishoes.service.KhuyenMaiService;
//import com.example.duanmishoes.util.ScheduledCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.UUID;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/khuyen-mai")
@RequiredArgsConstructor
public class KhuyenMaiController {
    @Autowired
    KhuyenMaiService khuyenMaiService;

//    private ScheduledCheck scheduledCheck;
    @GetMapping
    public ResponseEntity<?> getALL(){
//        scheduledCheck.checkKhuyenMai();
        return new ResponseEntity<>(khuyenMaiService.getAllKhuyenMai(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody KhuyenMai km){
        km.setNgayTao(new Date(new java.util.Date().getTime()));
        LocalDateTime ngayBD =  km.getNgayBatDau();
        LocalDateTime ngayKT =  km.getNgayKetThuc();
        LocalDateTime today = LocalDateTime.now();
        if (ngayBD.isAfter(today)) km.setTrangThai(0);
        else if (ngayBD.isBefore(today) && ngayKT.isAfter(today)) km.setTrangThai(1);
        else if (ngayKT.isBefore(today)) km.setTrangThai(2);
        km.setNgayBatDau(khuyenMaiService.convertTime(km.getNgayBatDau()));
        km.setNgayKetThuc(khuyenMaiService.convertTime(km.getNgayKetThuc()));

        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id,@RequestBody KhuyenMai km){
        km.setId(id);
        km.setNgaySua(new Date(new java.util.Date().getTime()));
        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") String id){
        return ResponseEntity.ok(khuyenMaiService.detailKhuyenMai(id));

    }
}

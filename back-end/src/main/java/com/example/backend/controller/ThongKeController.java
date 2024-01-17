package com.example.backend.controller;


import com.example.backend.service.ThongKeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;


@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/thong-ke")
@RequiredArgsConstructor
public class ThongKeController {
    @Autowired
    ThongKeService thongKeService;
    @GetMapping("/ngay")
    public ResponseEntity<?> thongKeTheoNgay(){

        return ResponseEntity.ok(thongKeService.thongKeTheoNgay());
    }
    @GetMapping("/thang")
    public ResponseEntity<?> thongKeTheoThang(){
        return ResponseEntity.ok(thongKeService.thongKeTheoThang());
    }
    @GetMapping("/nam")
    public ResponseEntity<?> thongKeTheoNam(){
        return ResponseEntity.ok(thongKeService.thongKeTheoNam());
    }

    @GetMapping("/san-pham-ban-chay")
    public ResponseEntity<?> getSPBanChay(){
        return ResponseEntity.ok(thongKeService.getSpBanChay());
    }
    @GetMapping("/bieu-do-ngay/{ngay}")
    public ResponseEntity<?> getBieuDoNgay(@PathVariable("ngay")String ngay) throws ParseException {
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date d=sdf.parse(ngay);
        Date date=new Date(d.getTime());
        return ResponseEntity.ok(thongKeService.getBieuDoNgay(date));
    }
    @GetMapping("/bieu-do-tuan/{ngay}")
    public ResponseEntity<?> getBieuDoTuan(@PathVariable("ngay")String ngay) throws ParseException {
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date d=sdf.parse(ngay);
        Date date=new Date(d.getTime());
        return ResponseEntity.ok(thongKeService.getBieuDoTuan(date));
    }
    @GetMapping("/bieu-do-thang/{ngay}")
    public ResponseEntity<?> getBieuDoThang(@PathVariable("ngay")String ngay) throws ParseException {
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date d=sdf.parse(ngay);
        Date date=new Date(d.getTime());
        return ResponseEntity.ok(thongKeService.getBieuDoThang(date));
    }
    @GetMapping("/trang-thai-hoa-don")
    public ResponseEntity<?> getTrangThaiHD(){
        return ResponseEntity.ok(thongKeService.getTrangThaiHoaDon());
    }
}

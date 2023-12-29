package com.example.backend.controller;


import com.example.backend.dto.request.KhuyenMaiRequest;
import com.example.backend.dto.request.KhuyenMaiSearch;
import com.example.backend.entity.KhuyenMai;
import com.example.backend.service.KhuyenMaiService;
//import com.example.duanmishoes.util.ScheduledCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.format.annotation.DateTimeFormat;
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
    public ResponseEntity<?> add(@RequestBody KhuyenMaiRequest request){
        KhuyenMai km = request.map();
        System.out.println(km.getId()+""+km.getMa()+""+km.getTen()+""+km.getLoai()+""+km.getNgay_bat_dau()+""+km.getNgay_ket_thuc()+""+km.getGia_tri_khuyen_mai());
        km.setNgayTao(new Date(new java.util.Date().getTime()));
        LocalDateTime ngayBD =  khuyenMaiService.convertTime(km.getNgay_bat_dau());
        LocalDateTime ngayKT = khuyenMaiService.convertTime(km.getNgay_ket_thuc());
        LocalDateTime today = LocalDateTime.now();
        System.out.println("Today"+today);
        System.out.println("Bắt đầu"+ngayBD);
        System.out.println("Kết thúc"+ngayKT);
        if (ngayBD.isAfter(today)) km.setTrangThai(0);
        else if (ngayBD.isBefore(today) && ngayKT.isAfter(today)) km.setTrangThai(1);
        else if (ngayKT.isBefore(today)) km.setTrangThai(2);
        km.setNgay_bat_dau(khuyenMaiService.convertTime(km.getNgay_bat_dau()));
        km.setNgay_ket_thuc(khuyenMaiService.convertTime(km.getNgay_ket_thuc()));

        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id,@RequestBody KhuyenMaiRequest request){
        KhuyenMai km = request.map();
        km.setId(id);
        LocalDateTime ngayBD =  khuyenMaiService.convertTimeForUpdate(km.getNgay_bat_dau());
        LocalDateTime ngayKT =  khuyenMaiService.convertTimeForUpdate(km.getNgay_ket_thuc());
        LocalDateTime today = LocalDateTime.now();
        int trangThai = khuyenMaiService.detailKhuyenMai(id).getTrangThai();
        km.setTrangThai(trangThai);
        km.setNgay_bat_dau(ngayBD);
        km.setNgay_ket_thuc(ngayKT);
        km.setNgaySua(new Date(new java.util.Date().getTime()));
        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") String id){
        return ResponseEntity.ok(khuyenMaiService.detailKhuyenMai(id));

    }

    @PutMapping("/updateTrangThai/{id}")
    public ResponseEntity<?> updateTrangThai(@PathVariable("id") String id , @RequestBody KhuyenMaiRequest request){
        KhuyenMai km = request.map();
        km.setId(id);
        km.setTrangThai(2);
        km.setNgaySua(new Date(new java.util.Date().getTime()));
        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }


    @PutMapping("/updateTrangThai1/{id}")
    public ResponseEntity<?> updateTrangThai1(@PathVariable("id") String id ,@RequestBody KhuyenMaiRequest request){
        KhuyenMai km = request.map();
        km.setId(id);
        if (km.getNgay_bat_dau().isAfter(LocalDateTime.now()))
        km.setTrangThai(0);
        else km.setTrangThai(1);
        km.setNgaySua(new Date(new java.util.Date().getTime()));
        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }

    @PostMapping("/search-khuyen-mai")
    public ResponseEntity<?> search(@RequestBody KhuyenMaiSearch khuyenMaiSearch){
        return ResponseEntity.ok(khuyenMaiService.getSearch(khuyenMaiSearch));
    }
}

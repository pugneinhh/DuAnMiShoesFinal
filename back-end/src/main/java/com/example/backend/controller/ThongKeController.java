package com.example.backend.controller;


import com.example.backend.service.ThongKeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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
}

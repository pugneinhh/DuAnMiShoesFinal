package com.example.backend.controller;


import com.example.backend.dto.request.sanpham.KichThuocRequest;
import com.example.backend.service.KichThuocService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/kich-thuoc")
@RequiredArgsConstructor
public class KichThuocController {
    @Autowired
    KichThuocService kichThuocService;

    @GetMapping
    public ResponseEntity<?> getALLKT() {
        return new ResponseEntity<>(kichThuocService.getALLKT(), HttpStatus.FOUND);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody KichThuocRequest kt) {
        int ktThem = kichThuocService.getALL().size();
        kt.setMa("KT" + "-" + (ktThem + 1));
        kt.setNgayTao(LocalDateTime.now());
        return ResponseEntity.ok(kichThuocService.addKT(kt));
    }
}

package com.example.duanmishoes.controller;

import com.example.duanmishoes.entity.KichThuoc;
import com.example.duanmishoes.service.KichThuocService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> add(@RequestBody KichThuoc kt) {
        int ktThem = kichThuocService.getALL().size();
        kt.setMa("KT" + "-" + (ktThem + 1));
        return ResponseEntity.ok(kichThuocService.addKT(kt));
    }
}

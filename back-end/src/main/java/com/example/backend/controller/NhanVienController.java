package com.example.backend.controller;

import com.example.backend.entity.NguoiDung;
import com.example.backend.entity.Voucher;
import com.example.backend.service.NhanVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.time.LocalDateTime;

@CrossOrigin("*")
@RestController
@RequestMapping("/nhan-vien")
@RequiredArgsConstructor
public class NhanVienController {
    @Autowired
    NhanVienService nhanVienService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(nhanVienService.getAll(), HttpStatus.FOUND);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody NguoiDung nd){
        return  ResponseEntity.ok(nhanVienService.addNhanVien(nd));
    }

}

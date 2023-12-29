package com.example.backend.controller;

import com.example.backend.entity.NguoiDung;
import com.example.backend.service.KhachHangService;
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

@CrossOrigin("*")
@RestController
@RequestMapping("/khach-hang")
@RequiredArgsConstructor
public class KhachHangController {

    @Autowired
    KhachHangService khachHangService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(khachHangService.getAll(), HttpStatus.FOUND);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody NguoiDung nd){
        return  ResponseEntity.ok(khachHangService.addKhachHang(nd));
    }

}

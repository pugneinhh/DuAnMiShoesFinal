package com.example.backend.controller;

import com.example.backend.dto.request.NguoiDungRequest;
import com.example.backend.service.NguoiDungService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/nguoi-dung")
@RequiredArgsConstructor
public class NguoiDungController {
    @Autowired
    NguoiDungService nguoiDungService;
    @GetMapping("/hien-thi")
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(nguoiDungService.getAll(), HttpStatus.FOUND);
    }
    @GetMapping("/khach-hang")
    public ResponseEntity<?> getKhach(){
        return new ResponseEntity<>(nguoiDungService.getKhach(), HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody NguoiDungRequest request){
        request.setNgayTao(LocalDateTime.now());
        request.setTrangThai(0);
        request.setNgayThamGia(LocalDateTime.now());
        return ResponseEntity.ok(nguoiDungService.add(request));
    }
}

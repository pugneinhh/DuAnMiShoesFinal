package com.example.backend.controller;

import com.example.backend.dto.request.NguoiDungVoucherRequest;
import com.example.backend.entity.NguoiDungVoucher;
import com.example.backend.service.NguoiDungVoucherService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/nguoi-dung-voucher")
@RequiredArgsConstructor
public class NguoiDungVoucherController {
    @Autowired
    NguoiDungVoucherService nguoiDungVoucherService;
    @GetMapping("/voucher/{id}")
    public ResponseEntity<?> getByVoucher(@PathVariable("id")String id){
        return ResponseEntity.ok(nguoiDungVoucherService.getAllByVoucher(id));
    }
    @GetMapping("/nguoi-dung/{id}")
    public ResponseEntity<?> getByNguoiDung(@PathVariable("id")String id){
        return ResponseEntity.ok(nguoiDungVoucherService.getAllByNguoiDung(id));
    }
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody NguoiDungVoucherRequest request){
        return ResponseEntity.ok(nguoiDungVoucherService.add(request));
    }
}
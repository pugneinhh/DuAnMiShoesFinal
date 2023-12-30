package com.example.backend.controller;

import com.example.backend.dto.response.ChiTietSanPhamRespone;
import com.example.backend.model.AdminBanHangHDRespon;
import com.example.backend.service.BanHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ban-hang")
@RequiredArgsConstructor
public class BanHangController {
    @Autowired
    BanHangService banHangService;

    @GetMapping()
    public ResponseEntity<?> getALL(){
        List<AdminBanHangHDRespon> list=banHangService.HoaDonBanHang();
        return ResponseEntity.ok(list);
    }
    @GetMapping("/getALLCTSP")
    public ResponseEntity<?> getALLctsp(){
        List<ChiTietSanPhamRespone> list=banHangService.getALLCTSPBanHang();
        return ResponseEntity.ok(list);
    }
}

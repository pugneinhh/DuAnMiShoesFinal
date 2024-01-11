package com.example.backend.controller;

import com.example.backend.dto.request.HoaDonRequest;
import com.example.backend.dto.response.ChiTietSanPhamRespone;
import com.example.backend.model.AdminBanHangHDRespon;
import com.example.backend.service.BanHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ban-hang")
@RequiredArgsConstructor
public class BanHangController {
    @Autowired
    BanHangService banHangService;


    @GetMapping("/getALLCTSP")
    public ResponseEntity<?> getALLctsp(){
        List<ChiTietSanPhamRespone> list=banHangService.getALLCTSPBanHang();
        return ResponseEntity.ok(list);
    }
    @PostMapping("/add-hoa-don")
    public  ResponseEntity<?> addHD(@RequestBody HoaDonRequest hoaDonRequest){

        return  ResponseEntity.ok(hoaDonRequest);
    }
}

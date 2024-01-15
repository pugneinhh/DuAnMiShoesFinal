package com.example.backend.controller;

import com.example.backend.dto.request.HoaDonChiTietRequest;
import com.example.backend.dto.request.HoaDonRequest;
import com.example.backend.dto.response.ChiTietSanPhamRespone;
import com.example.backend.model.AdminBanHangHDRespon;
import com.example.backend.service.BanHangService;
import com.example.backend.service.HoaDonChiTietService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ban-hang")
@RequiredArgsConstructor
public class BanHangController {
    @Autowired
    BanHangService banHangService;
    @Autowired
    HoaDonChiTietService hoaDonChiTietService;

    @GetMapping("/getALLCTSP")
    public ResponseEntity<?> getALLctsp(){
        List<ChiTietSanPhamRespone> list=banHangService.getALLCTSPBanHang();
        return ResponseEntity.ok(list);
    }
    @PostMapping("/add-hoa-don")
    public  ResponseEntity<?> addHD(@RequestBody HoaDonRequest hoaDonRequest){
        System.out.println("Hóa đơn requết"+hoaDonRequest);
        hoaDonRequest.setMa("HDTQ"+ RandomStringUtils.randomNumeric(6));
        hoaDonRequest.setLoaiHoaDon(0);
        hoaDonRequest.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(banHangService.addHoaDon(hoaDonRequest));
    }
    @PostMapping("/addHDCT")
    public ResponseEntity<?> addHDCT(@RequestBody HoaDonChiTietRequest request){
        return ResponseEntity.ok(hoaDonChiTietService.addHDCT(request));
    }
    @GetMapping("/hien-thi-hdct/{id}")
    public ResponseEntity<?> getHDCTByHD(@PathVariable("id") String id){
        return ResponseEntity.ok(hoaDonChiTietService.getAllHDCTByHD(id));
    }
    @GetMapping("/hoa-don-chi-tiet/{idHD}/{idCTSP}")
    public ResponseEntity<?> getOneHDCT(@PathVariable("idHD")String idHD,
                                        @PathVariable("idCTSP")String idCTSP){
        return ResponseEntity.ok(hoaDonChiTietService.getOneHDCT(idHD,idCTSP));
    }
}

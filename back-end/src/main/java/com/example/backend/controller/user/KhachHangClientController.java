package com.example.backend.controller.user;

import com.example.backend.service.KhachHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/khach-hang")
@RequiredArgsConstructor
public class KhachHangClientController {
    @Autowired
    KhachHangService khachHangService;
    @GetMapping("/dia-chi/{idKH}")
    public ResponseEntity<?> getALLDCbyKH(@PathVariable("idKH") String idKH){
        return ResponseEntity.ok(khachHangService.findDiaChiByKH(idKH));
    }
    @GetMapping("/dia-chi-mac-dinh/{idKH}")
    public  ResponseEntity<?> getDiaChiMacDinh(@PathVariable("idKH") String idKH){
        return ResponseEntity.ok(khachHangService.findDiaChiMacDinh(idKH));
    }
}

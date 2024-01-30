package com.example.backend.controller.admin;

import com.example.backend.service.SanPhamClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/client/sanpham")
public class SanPhamClientController {
    @Autowired
    private SanPhamClientService SanPhamClientService;
    @GetMapping("detailCTSP/{idCT}")
    public ResponseEntity<?> getDetail(@PathVariable("idCT") String id) {
        return  ResponseEntity.ok(SanPhamClientService.detailCTSPClient(id));
    }
}

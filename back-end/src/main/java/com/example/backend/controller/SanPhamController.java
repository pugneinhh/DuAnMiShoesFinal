package com.example.duanmishoes.controller;

import com.example.duanmishoes.entity.SanPham;
import com.example.duanmishoes.service.SanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/san-pham")
@RequiredArgsConstructor
public class SanPhamController {
    @Autowired
    SanPhamService sanPhamService;
    @GetMapping
    public ResponseEntity<?> getALLSP(){
        return new ResponseEntity<>(sanPhamService.getALLSP(), HttpStatus.FOUND);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        if (sanPhamService.existByID(id)) {
            sanPhamService.deleteByID(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody SanPham v){
        return  ResponseEntity.ok(sanPhamService.addSP(v));

    }

    @GetMapping("/showSP/{idCTSP}")
    public ResponseEntity<?> getSPByCTSP(@PathVariable("idCTSP") String id){
        return ResponseEntity.ok(sanPhamService.getSPByCTSP(UUID.fromString(id)));
    }
}

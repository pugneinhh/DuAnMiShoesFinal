package com.example.backend.controller;


import com.example.backend.dto.request.sanpham.DeGiayRequest;
import com.example.backend.service.DeGiayService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/de-giay")
@RequiredArgsConstructor
public class DeGiayController {
    @Autowired
    private DeGiayService deGiayService;

    @GetMapping
    public ResponseEntity<?> getALLDC() {
        return new ResponseEntity<>(deGiayService.getALLDC(), HttpStatus.FOUND);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody DeGiayRequest dg) {
        int dcThem = deGiayService.getALL().size();
        dg.setMa("DG" + "-" + (dcThem + 1));
        dg.setNgayTao(LocalDateTime.now());
        return ResponseEntity.ok(deGiayService.addDC(dg));
    }
}

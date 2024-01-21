package com.example.backend.controller;


import com.example.backend.dto.request.sanpham.MauSacRequest;
import com.example.backend.dto.request.sanphamsearch.BangConSearch;
import com.example.backend.service.MauSacService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("*")
@RestController
@RequestMapping("/mau-sac")
@RequiredArgsConstructor
public class MauSacController {
    @Autowired
    MauSacService mauSacService;

    @GetMapping
    public ResponseEntity<?> getALLMS() {
        return new ResponseEntity<>(mauSacService.getALLMS(), HttpStatus.FOUND);
    }

    @GetMapping("/detail/{idMS}")
    public ResponseEntity<?> detail(@PathVariable("idMS") String id){
        return ResponseEntity.ok(mauSacService.detailMS(id));
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody BangConSearch bangConSearch){
        return ResponseEntity.ok(mauSacService.getTim(bangConSearch));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody MauSacRequest v) {
        int msThem = mauSacService.getALL().size();
        v.setNgayTao(LocalDateTime.now());
        return ResponseEntity.ok(mauSacService.addMS(v));
    }
}

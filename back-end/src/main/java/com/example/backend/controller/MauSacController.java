package com.example.duanmishoes.controller;

import com.example.duanmishoes.dto.request.MauSacRequest;
import com.example.duanmishoes.service.MauSacService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody MauSacRequest v) {
//        int msThem = mauSacService.getALL().size();
//        v.setMa("MS" + "-" + (msThem + 1));
        return ResponseEntity.ok(mauSacService.addMS(v));
    }
}

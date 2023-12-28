package com.example.backend.controller;


import com.example.backend.dto.request.HangRequest;
import com.example.backend.entity.Hang;
import com.example.backend.service.HangService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/hang")
@RequiredArgsConstructor
public class HangController {
    @Autowired
    HangService hangService;

    @GetMapping
    public ResponseEntity<?> getALLH() {
        return new ResponseEntity<>(hangService.getALLH(), HttpStatus.FOUND);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody HangRequest h) {
        int hThem = hangService.getALL().size();
        h.setMa("H" + "-" + (hThem + 1));
        h.setNgayTao(LocalDateTime.now());
        return ResponseEntity.ok(hangService.addH(h));
    }
}

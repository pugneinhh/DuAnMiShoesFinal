package com.example.duanmishoes.controller;

import com.example.duanmishoes.entity.Hang;
import com.example.duanmishoes.service.HangService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> add(@RequestBody Hang h) {
        int hThem = hangService.getALL().size();
        h.setMa("H" + "-" + (hThem + 1));
        return ResponseEntity.ok(hangService.addH(h));
    }
}

package com.example.backend.controller;


import com.example.backend.dto.request.ChatLieuRequest;
import com.example.backend.entity.ChatLieu;
import com.example.backend.service.ChatLieuService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/chat-lieu")
@RequiredArgsConstructor    
public class ChatLieuController {
    @Autowired
    ChatLieuService chatLieuService;

    @GetMapping
    public ResponseEntity<?> getALLCL(){
        return new ResponseEntity<>(chatLieuService.getALLCL(), HttpStatus.FOUND);
    }

    @GetMapping("/detail/{idCL}")
    public ResponseEntity<?> detail(@PathVariable("idCL") String id){
        return ResponseEntity.ok(chatLieuService.detailCL(id));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ChatLieuRequest v){
        int clThem = chatLieuService.getALL().size();
        v.setMa("CL" + "-" + (clThem + 1));
        v.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(chatLieuService.addCL(v));
    }
}

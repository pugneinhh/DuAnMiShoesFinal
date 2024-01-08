package com.example.backend.controller;

import com.example.backend.dto.request.NhanVienRequest;
import com.example.backend.service.NhanVienService;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/nhan-vien")
@RequiredArgsConstructor
public class NhanVienController {
    @Autowired
    NhanVienService nhanVienService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(nhanVienService.getAll(), HttpStatus.FOUND);
    }

    @PostMapping()
    public ResponseEntity<?> add(@RequestParam("request") String request,
                                 @RequestParam(value = "file") MultipartFile file){
        Gson gson = new Gson();
        NhanVienRequest nhanVienRequest=gson.fromJson(request, NhanVienRequest.class);
        return  ResponseEntity.ok(nhanVienService.add(nhanVienRequest,file));
    }

}

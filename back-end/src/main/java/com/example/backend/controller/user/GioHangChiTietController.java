package com.example.backend.controller.user;

import com.example.backend.dto.request.GioHangChiTietRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/gio-hang-chi-tiet")
@RequiredArgsConstructor
public class GioHangChiTietController {
    @Autowired
    GioHangChiTietController gioHangChiTietService;
    @GetMapping("/getAll/{idGH}")
    public ResponseEntity<?> getAllGHCT(@PathVariable("idGH")String idGH){
        return ResponseEntity.ok(gioHangChiTietService.getAllGHCT(idGH));
    }
    @PostMapping("/addGHCT")
    public ResponseEntity<?> addGHCT(@RequestBody GioHangChiTietRequest request){
        return ResponseEntity.ok(gioHangChiTietService.addGHCT(request));
    }
}

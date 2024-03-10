package com.example.backend.controller.admin;

import com.example.backend.service.ThongBaoService;
import com.example.backend.service.ThongKeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/thong-bao")
@RequiredArgsConstructor
public class ThongBaoController {
    @Autowired
    private ThongBaoService thongBaoService;
    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(thongBaoService.getAllAdmin());
    }

    @GetMapping("/count")
    public ResponseEntity<?> count(){
        return ResponseEntity.ok(thongBaoService.countAdmin());
    }
}

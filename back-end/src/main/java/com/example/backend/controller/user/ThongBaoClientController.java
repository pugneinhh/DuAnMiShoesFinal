package com.example.backend.controller.user;

import com.example.backend.service.ThongBaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/thong-bao")
@RequiredArgsConstructor
public class ThongBaoClientController {
    @Autowired
    private ThongBaoService thongBaoService;

    @PutMapping("/da-xem/{id}")
    public ResponseEntity<?> daXem(@PathVariable String id) {
        return ResponseEntity.ok(thongBaoService.daxem(id));
    }
}

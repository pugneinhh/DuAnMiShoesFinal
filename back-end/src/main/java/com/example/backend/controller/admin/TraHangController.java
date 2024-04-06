package com.example.backend.controller.admin;

import com.example.backend.service.TraHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/tra-hang")
@RequiredArgsConstructor
public class TraHangController {
    @Autowired
    TraHangService traHangService;

    @GetMapping("/hoa-don/{ma}")
    public ResponseEntity<?> getHoaDon(@PathVariable("ma")String ma){
        return ResponseEntity.ok(traHangService.getAllHDCTByHoaDon(ma));
    }

}

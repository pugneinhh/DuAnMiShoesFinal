package com.example.backend.controller.user;

import com.example.backend.dto.request.sanpham.AddAnhRequest;
import com.example.backend.repository.HinhAnhRepository;
import com.example.backend.service.HinhAnhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/hinhanh")
public class HinhAnhClientController {
    @Autowired
    HinhAnhRepository hinhAnhRepository;
    @Autowired
    HinhAnhService hinhAnhService;
    @GetMapping("/{ten}/{idSP}")
    public ResponseEntity<?> detail(@PathVariable("ten") String ten, @PathVariable("idSP") String idSP){
        System.out.println(idSP);
        System.out.println(ten);
        return ResponseEntity.ok(hinhAnhRepository.getAnhCTSP(ten,idSP));
    }
    @PostMapping("/add-anh")
    public ResponseEntity<?> upAnh(@RequestBody AddAnhRequest ha){
        int maAnh = hinhAnhService.getALL().size();
        ha.setTrangThai(0);
        ha.setNgayTao(LocalDateTime.now());
        ha.setMa("HA-" + (maAnh + 1));
        hinhAnhService.addAnhMoi(ha);
        return ResponseEntity.ok("Done");
    }
}

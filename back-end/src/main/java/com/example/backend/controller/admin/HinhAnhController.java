package com.example.backend.controller.admin;

import com.example.backend.dto.request.sanpham.AddAnhRequest;
import com.example.backend.dto.request.sanpham.HinhAnhRequest;
import com.example.backend.repository.HinhAnhRepository;
import com.example.backend.service.HinhAnhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/hinhanh")
public class HinhAnhController {
    @Autowired
    HinhAnhRepository hinhAnhRepository;
    @Autowired
    HinhAnhService hinhAnhService;
    @GetMapping("/{ten}/{idSP}")
    public ResponseEntity<?> detail(@PathVariable("ten") String ten,@PathVariable("idSP") String idSP){

        return ResponseEntity.ok(hinhAnhRepository.getAnhCTSP(ten,idSP));
    }
    @PostMapping("/add-anh/{idSP}")
    public ResponseEntity<?> upAnh(@RequestBody HinhAnhRequest ha,@PathVariable("idSP") String idSP){
        int maAnh = hinhAnhService.getALL().size();
        ha.setChiTietSanPham(idSP);
        ha.setTrangThai(0);
        ha.setNgayTao(LocalDateTime.now());
        ha.setMa("HA-" + (maAnh + 1));
        return ResponseEntity.ok(hinhAnhService.add(ha));
    }

    @DeleteMapping("/delete-anh/{idCTSP}")
    public ResponseEntity<?> deleteAnh(@PathVariable("idCTSP") String idCTSP){
        hinhAnhService.deleteAnh(idCTSP);
        return ResponseEntity.ok("Done");
    }
}

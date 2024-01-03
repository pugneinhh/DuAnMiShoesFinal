package com.example.backend.controller;


import com.example.backend.dto.request.AddRequest;
import com.example.backend.dto.request.ChiTietSanPhamRequest;
import com.example.backend.dto.request.HinhAnhRequest;
import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.entity.KhuyenMai;
import com.example.backend.service.CTSPService;
import com.example.backend.service.HinhAnhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.sql.SQLOutput;
import java.time.LocalDateTime;
import java.util.UUID;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ctsp")
public class CTSPController {
    @Autowired
    private CTSPService ctspService;
    @Autowired
    private HinhAnhService hinhAnhService;

    @GetMapping("/show")
    public ResponseEntity<?> getALLCTSP() {
        return new ResponseEntity<>(ctspService.getALL(), HttpStatus.OK);
    }

    @GetMapping("/showct/{idSP}")
    public ResponseEntity<?> getALLCTSP(@PathVariable("idSP") String id) {
        return new ResponseEntity<>(ctspService.getALLCTSP(id), HttpStatus.OK);
    }

    @GetMapping("/showct")
    public ResponseEntity<?> getALLCTSP_1(@RequestParam String id) {
        return new ResponseEntity<>(ctspService.getALLCTSP(id), HttpStatus.OK);
    }

    @PutMapping("/updateKM/{idCTSP}")
    public ResponseEntity<?> update(@PathVariable("idCTSP") String idCTSP, @RequestBody KhuyenMai khuyenMai) {
        System.out.println("Vào update");
        return ResponseEntity.ok(ctspService.updateKM(idCTSP, khuyenMai));
    }

    @GetMapping("/showKM/{idKM}")
    public ResponseEntity<?> getALLCTSPByKM(@PathVariable("idKM") String id){
        System.out.println("id"+id);
        return  ResponseEntity.ok(ctspService.getALLCTSPByKM(id));
    }

    @GetMapping("/showCTSP/{idSP}")
    public ResponseEntity<?> getCTSPByIDSP(@PathVariable("idSP") String id){
        System.out.println("id "+id);
        return  ResponseEntity.ok(ctspService.getAllCTSPByIDSP(id));
    }


    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody ChiTietSanPhamRequest request,HinhAnhRequest ha) {
        request.setTrangThai(1);
        request.setNgayTao(LocalDateTime.now());
        request.setSoLuong(1);
        request.setGioiTinh(true);
        request.setGiaBan(BigDecimal.valueOf(1000000));
        ChiTietSanPham newct = ctspService.add(request);

        int maAnh = hinhAnhService.getALL().size();
        ha.setTrangThai(1);
        ha.setMa("HA-" + (maAnh + 1));
        ha.setChiTietSanPham(newct.getId());
        ha.setTen("Pic - "+ ha.getMa());
        ha.setUrl("https://res.cloudinary.com/dtetgawxc/image/upload/v1700905968/MiShoes/giay1_m22dnx.jpg");
        hinhAnhService.add(ha);
        return ResponseEntity.ok("Done");
    }
}


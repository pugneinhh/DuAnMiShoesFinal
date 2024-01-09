package com.example.backend.controller;


import com.example.backend.dto.request.AddRequest;
import com.example.backend.dto.request.ChiTietSanPhamRequest;
import com.example.backend.dto.request.HinhAnhRequest;
import com.example.backend.dto.request.UpdateCTSPRequest;
import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.entity.KhuyenMai;
import com.example.backend.service.CTSPService;
import com.example.backend.service.HinhAnhService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.sql.SQLOutput;
import java.time.LocalDateTime;
import java.util.List;
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

    @GetMapping("/detail/{idCT}")
    public ResponseEntity<?> getDetail(@PathVariable("idCT") String id) {
        return new ResponseEntity<>(ctspService.detailCTSP(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody UpdateCTSPRequest request){
            return ResponseEntity.ok(ctspService.update(id,request));
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
        request.setGioiTinh(true);
        ChiTietSanPham newct = ctspService.add(request);

        int maAnh = hinhAnhService.getALL().size();
        ha.setTrangThai(1);
        ha.setMa("HA-" + (maAnh + 1));
        ha.setChiTietSanPham(newct.getId());
        ha.setTen("P-"+newct.getTenCt());
        ha.setUrl(newct.getGhiChu());
        hinhAnhService.add(ha);
        return ResponseEntity.ok("Done");
    }
}


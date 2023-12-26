package com.example.duanmishoes.controller;

import com.example.duanmishoes.entity.KhuyenMai;
import com.example.duanmishoes.service.CTSPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ctsp")
public class CTSPController {
    @Autowired
    private CTSPService ctspService;
    @GetMapping("/showct/{idSP}")
    public ResponseEntity<?> getALLCTSP(@PathVariable("idSP") String id){
        return new ResponseEntity<>(ctspService.getALLCTSP(UUID.fromString(id)), HttpStatus.OK);
    }

    @GetMapping("/showct")
    public ResponseEntity<?> getALLCTSP_1(@RequestParam String id){
        return new ResponseEntity<>(ctspService.getALLCTSP(UUID.fromString(id)), HttpStatus.OK);
    }

    @PutMapping("/updateKM/{idCTSP}")
    public ResponseEntity<?> update(@PathVariable("idCTSP") String idCTSP,@RequestBody KhuyenMai khuyenMai){
        System.out.println("Vào update");
        return  ResponseEntity.ok(ctspService.updateKM(idCTSP,khuyenMai));
    }

    @GetMapping("/showKM/{idKM}")
    public ResponseEntity<?> getALLCTSPByKM(@PathVariable("idKM") String id){
        return new ResponseEntity<>(ctspService.getALLCTSPByKM(UUID.fromString(id)), HttpStatus.OK);
    }
}


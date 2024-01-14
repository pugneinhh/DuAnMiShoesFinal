package com.example.backend.controller;


import com.example.backend.dto.request.DanhMucRequest;
import com.example.backend.dto.request.sanphamsearch.SanPhamSearch;
import com.example.backend.service.DanhMucService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/danh-muc")
@RequiredArgsConstructor
public class DanhMucController {
    @Autowired
    private DanhMucService danhMucService;
    @GetMapping
    public ResponseEntity<?> getALLDM(){
        return new ResponseEntity<>(danhMucService.getALLDM(), HttpStatus.FOUND);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody DanhMucRequest request){
        System.out.println(request);
        return ResponseEntity.ok(danhMucService.update(id,request));
    }

    @GetMapping("/detail/{idDM}")
    public ResponseEntity<?> detail(@PathVariable("idDM") String id){
        return ResponseEntity.ok(danhMucService.detailDM(id));
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody SanPhamSearch sanPhamSearch){
        return ResponseEntity.ok(danhMucService.getTim(sanPhamSearch));
    }
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody DanhMucRequest v){
        int dmThem = danhMucService.getALL().size();
        v.setMa("DM" + "-" + (dmThem + 1));
        v.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(danhMucService.addDM(v));
    }
}

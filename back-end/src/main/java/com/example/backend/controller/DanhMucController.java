package com.example.duanmishoes.controller;

import com.example.duanmishoes.dto.request.DanhMucRequest;
import com.example.duanmishoes.entity.DanhMuc;
import com.example.duanmishoes.service.DanhMucService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

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
    @GetMapping("/tim-kiem/{key}/{timTT}")
    public ResponseEntity<?> tim(@PathVariable("key")String key,
                                 @PathVariable("timTT")int timTT) throws ParseException {
        return  ResponseEntity.ok(danhMucService.getTim(key,timTT));
    }
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody DanhMuc v){
        int dmThem = danhMucService.getALL().size();
        v.setMa("DM" + "-" + (dmThem + 1));
        return  ResponseEntity.ok(danhMucService.addDM(v));
    }
}

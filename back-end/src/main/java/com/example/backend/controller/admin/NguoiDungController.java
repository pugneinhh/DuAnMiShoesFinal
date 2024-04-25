package com.example.backend.controller.admin;


import com.example.backend.dto.request.DoiMatKhauRequest;
import com.example.backend.service.NguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/nguoi-dung")
public class NguoiDungController {

    @Autowired
    NguoiDungService nguoiDungService;

    @GetMapping("")
    public ResponseEntity<?> getALLNguoiDung(){
        return ResponseEntity.ok(nguoiDungService.getAll());
    }
    @PutMapping("/doi-mat-khau/{idNV}")
    public ResponseEntity<?> doiMatKhau(@RequestBody DoiMatKhauRequest doiMatKhauRequest, @PathVariable("idNV") String idNV){
        return ResponseEntity.ok(nguoiDungService.doiMatKhau(idNV,doiMatKhauRequest));
    }
    @GetMapping("/detail/{idNV}")
    public ResponseEntity<?> detailMK(@PathVariable("idNV") String idNV){
        return ResponseEntity.ok(nguoiDungService.findByID(idNV));
    }
    @GetMapping("/MK/{idNV}")
    public ResponseEntity<?> mk(@PathVariable("idNV") String idNV){
        return ResponseEntity.ok(nguoiDungService.layMK(idNV));
    }
}

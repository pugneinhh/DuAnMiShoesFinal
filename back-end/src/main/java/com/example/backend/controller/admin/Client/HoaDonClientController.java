package com.example.backend.controller.admin.Client;


import com.example.backend.dto.request.HoaDonCLient.TrangThaiRequest;
import com.example.backend.service.Client.HoaDonClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/client-hoa-don")
@RequiredArgsConstructor
public class HoaDonClientController {

    @Autowired
    HoaDonClientService hoaDonClientService;
    @PostMapping("")
    public ResponseEntity<?> getALLHoaDonOL(@RequestBody TrangThaiRequest request ){
        System.out.println("tttttttt"+request.getTrangThai());
        return ResponseEntity.ok(hoaDonClientService.getALLHDClientByIDKH(request));
    }
    @GetMapping("hoa-don/{id}")
    public ResponseEntity<?> getALLHoaDonOLByIDHD(@PathVariable("id") String id){
        return ResponseEntity.ok(hoaDonClientService.detailHDSanPham(id));
    }
}

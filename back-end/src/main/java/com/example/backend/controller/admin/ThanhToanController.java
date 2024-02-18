package com.example.backend.controller.admin;

import com.example.backend.dto.request.ThanhToanRequest;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.NguoiDung;
import com.example.backend.repository.HoaDonRepository;
import com.example.backend.service.HoaDonServicee;
import com.example.backend.service.KhachHangService;
import com.example.backend.service.NguoiDungService;
import com.example.backend.service.ThanhToanService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/thanh-toan")
@RequiredArgsConstructor
public class ThanhToanController {
    @Autowired
    ThanhToanService thanhToanService;
    @Autowired
    HoaDonRepository hoaDonService;
    @Autowired
    KhachHangService khachHangService;
    @Autowired
    NguoiDungService nguoiDungService;
    @PostMapping("/thanh-toan-tien-mat")
    public ResponseEntity<?> thanhToan(@RequestBody ThanhToanRequest request){
//        HoaDon hd=hoaDonService.findById(request.getHoaDon()).get();
//        hd.setTrangThai(4);
//        hd.setNgayMua(LocalDateTime.now());
//        hoaDonService.save(hd);
//        if(hd.getNguoiDung()!=null){
//            NguoiDung nguoiDung=hd.getNguoiDung();
//            if(hd.getDiemSuDung()>0){
//                nguoiDung.setDiem(nguoiDung.getDiem()-hd.getDiemSuDung());
//            }
//            nguoiDung.setDiem(nguoiDung.getDiem()+hd.getGiaTriDiem());
//        }
        NguoiDung nguoiDung = nguoiDungService.findByID(request.getNguoiTao());
        request.setNguoiTao(nguoiDung.getMa());
        request.setNgayTao(LocalDateTime.now());
        request.setPhuongThuc(0);
        request.setTrangThai(0);
        return ResponseEntity.ok(thanhToanService.thanhToan(request));
    }

    @PostMapping("/thanh-toan-chuyen-khoan")
    public ResponseEntity<?> thanhToanCK(@RequestBody ThanhToanRequest request){
//        HoaDon hd=hoaDonService.findById(request.getHoaDon()).get();
//        hd.setTrangThai(4);
//        hd.setNgayMua(LocalDateTime.now());
//        hoaDonService.save(hd);
//        if(hd.getNguoiDung()!=null){
//            NguoiDung nguoiDung=hd.getNguoiDung();
//            if(hd.getDiemSuDung()>0){
//                nguoiDung.setDiem(nguoiDung.getDiem()-hd.getDiemSuDung());
//            }
//            nguoiDung.setDiem(nguoiDung.getDiem()+hd.getGiaTriDiem());
//        }
        System.out.println("Người tạo: "+request.getNguoiTao());
        NguoiDung nguoiDung = nguoiDungService.findByID(request.getNguoiTao());
        request.setNguoiTao(nguoiDung.getMa());
        request.setNgayTao(LocalDateTime.now());
        request.setPhuongThuc(1);
        request.setTrangThai(0);
        return ResponseEntity.ok(thanhToanService.thanhToan(request));
    }


    @GetMapping("/{idHD}")
    public  ResponseEntity<?> getALlLichSuThanhToan(@PathVariable String idHD){
        return ResponseEntity.ok(thanhToanService.getALLLLichSuThanhToanByIDHD(idHD));
    }
}

package com.example.backend.controller.user;

import com.example.backend.dto.request.HoaDonChiTietRequest;
import com.example.backend.dto.request.HoaDonRequest;
import com.example.backend.entity.CongThuc;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.LichSuHoaDon;
import com.example.backend.repository.CTSPRepository;
import com.example.backend.repository.CongThucRepository;
import com.example.backend.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ban-hang-client")
@RequiredArgsConstructor
public class BanHangClient {
    @Autowired
    BanHangService banHangService;
    @Autowired
    HoaDonChiTietService hoaDonChiTietService;
    @Autowired
    CTSPRepository ctspRepository;
    @Autowired
    CongThucRepository congThucRepository;
    @Autowired
    VoucherService voucherService;

    @Autowired
    HoaDonServicee hoaDonServicee;
    @Autowired
    NguoiDungService nguoiDungService;
    @Autowired
    LichSuHoaDonService lichSuHoaDonService;
    @PostMapping("/add-hoa-don")
    public ResponseEntity<?> addHD(@RequestBody HoaDonRequest hoaDonRequest){

        CongThuc ct=congThucRepository.getCongThucByTrangThai(0);
        // hoaDonRequest.setMa("HDTQ"+ RandomStringUtils.randomNumeric(6));
        hoaDonRequest.setLoaiHoaDon(0);
        hoaDonRequest.setNgayTao(LocalDateTime.now());
        hoaDonRequest.setNgayMua(LocalDateTime.now());
        hoaDonRequest.setTrangThai(0);
        //  hoaDonRequest.setGiaTriDiem(Integer.valueOf(hoaDonRequest.getThanhTien().intValue()/ct.getTiSo().intValue()));
        banHangService.addHoaDon(hoaDonRequest);
        HoaDon hoaDon=hoaDonServicee.findHoaDonbyID(hoaDonRequest.getId());

        LichSuHoaDon lichSuHoaDon= new LichSuHoaDon();
        lichSuHoaDon.setId(hoaDonRequest.getId());
        lichSuHoaDon.setHoaDon(hoaDon);
//        lichSuHoaDon.setNguoiTao(hoaDonRequest.getNguoiDung());
        lichSuHoaDon.setTrangThai(0);
        lichSuHoaDon.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(lichSuHoaDonService.save(lichSuHoaDon));
    }
    @PostMapping("/addHDCT")
    public ResponseEntity<?> addHDCT(@RequestBody HoaDonChiTietRequest request){
        request.setNgayTao(LocalDateTime.now());
        request.setTrangThai(0);
        return ResponseEntity.ok(hoaDonChiTietService.addHDCT(request));
    }
}

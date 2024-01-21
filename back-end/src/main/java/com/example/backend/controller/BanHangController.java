package com.example.backend.controller;

import com.example.backend.dto.request.HoaDonChiTietRequest;
import com.example.backend.dto.request.HoaDonRequest;
import com.example.backend.dto.response.sanpham.ChiTietSanPhamRespone;
import com.example.backend.dto.response.ChiTietSanPhamForBanHang;
import com.example.backend.dto.response.ChiTietSanPhamRespone;
import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.entity.CongThuc;
import com.example.backend.repository.CTSPRepository;
import com.example.backend.repository.CongThucRepository;
import com.example.backend.service.BanHangService;
import com.example.backend.service.HoaDonChiTietService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ban-hang")
@RequiredArgsConstructor
public class BanHangController {
    @Autowired
    BanHangService banHangService;
    @Autowired
    HoaDonChiTietService hoaDonChiTietService;
    @Autowired
    CTSPRepository ctspRepository;
    @Autowired
    CongThucRepository congThucRepository;

    @GetMapping("/getALLCTSP")
    public ResponseEntity<?> getALLctsp(){
        List<ChiTietSanPhamForBanHang> list=banHangService.getALLCTSPBanHang();
        return ResponseEntity.ok(list);
    }
    @PostMapping("/add-hoa-don")
    public  ResponseEntity<?> addHD(@RequestBody HoaDonRequest hoaDonRequest){
        CongThuc ct=congThucRepository.getCongThucByTrangThai(0);
        System.out.println("Hóa đơn requết"+hoaDonRequest);
        hoaDonRequest.setMa("HDTQ"+ RandomStringUtils.randomNumeric(6));
        hoaDonRequest.setLoaiHoaDon(0);
        hoaDonRequest.setNgayTao(LocalDateTime.now());
      //  hoaDonRequest.setGiaTriDiem(Integer.valueOf(hoaDonRequest.getThanhTien().intValue()/ct.getTiSo().intValue()));

        return  ResponseEntity.ok(banHangService.addHoaDon(hoaDonRequest));
    }
    @PostMapping("/addHDCT")
    public ResponseEntity<?> addHDCT(@RequestBody HoaDonChiTietRequest request){
        System.out.println("Hóa đơn chi tiet requết"+request);
        System.out.println("re quet"+request.getChiTietSanPham());
        request.setNgayTao(LocalDateTime.now());
        String idCTSP= request.getChiTietSanPham();
        ChiTietSanPham ctsp=ctspRepository.findById(idCTSP).get();
        ctsp.setSoLuong(ctsp.getSoLuong()- request.getSoLuong());
        System.out.println("CTSP"+ctsp.toString());
        ctspRepository.save(ctsp);
        return ResponseEntity.ok(hoaDonChiTietService.addHDCT(request));
    }
    @PostMapping("/thanh-toan")
    public ResponseEntity<?> thanhToan(@RequestBody HoaDonRequest hoaDonRequest){
        hoaDonRequest.setTrangThai(1);
        hoaDonRequest.setNgayMua(LocalDateTime.now());
        return ResponseEntity.ok(banHangService.addHoaDon(hoaDonRequest));
    }
    @GetMapping("/hien-thi-hdct/{id}")
    public ResponseEntity<?> getHDCTByHD(@PathVariable("id") String id){
        return ResponseEntity.ok(hoaDonChiTietService.getAllHDCTByHD(id));
    }
    @GetMapping("/hoa-don-chi-tiet/{idHD}/{idCTSP}")
    public ResponseEntity<?> getOneHDCT(@PathVariable("idHD")String idHD,
                                        @PathVariable("idCTSP")String idCTSP){
        return ResponseEntity.ok(hoaDonChiTietService.getOneHDCT(idHD,idCTSP));
    }

}

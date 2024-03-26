package com.example.backend.controller.user;

import com.example.backend.dto.request.HoaDonCLient.HoaDonClientRequest;
import com.example.backend.dto.request.HoaDonChiTietRequest;
import com.example.backend.dto.request.HoaDonRequest;
import com.example.backend.dto.request.ThanhToanRequest;
import com.example.backend.entity.CongThuc;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.LichSuHoaDon;
import com.example.backend.entity.NguoiDung;
import com.example.backend.repository.CTSPRepository;
import com.example.backend.repository.CongThucRepository;
import com.example.backend.repository.HoaDonChiTietRepository;
import com.example.backend.repository.HoaDonRepository;
import com.example.backend.service.*;
import com.example.backend.vnp_1.Config;
import com.example.backend.vnp_1.PayService;
import com.example.backend.vnp_1.PaymentResDTO;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

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
    PayService payService;
    @Autowired
    HoaDonServicee hoaDonServicee;
    @Autowired
    NguoiDungService nguoiDungService;
    @Autowired
    LichSuHoaDonService lichSuHoaDonService;
    @Autowired
    ThanhToanService thanhToanService;
    @Autowired
    HoaDonRepository hoaDonRepository;

    private  String  BASE_FRONTEND_ENDPOINT = "http://localhost:3000";



    @PostMapping("/add-hoa-don")
    public ResponseEntity<?> addHD(@RequestBody HoaDonRequest hoaDonRequest){
        System.out.println("Hóa đơn client"+hoaDonRequest);
        CongThuc ct=congThucRepository.getCongThucByTrangThai(0);
        // hoaDonRequest.setMa("HDTQ"+ RandomStringUtils.randomNumeric(6));
        hoaDonRequest.setLoaiHoaDon(0);
        hoaDonRequest.setNgayTao(LocalDateTime.now());
        hoaDonRequest.setNgayMua(LocalDateTime.now());
        hoaDonRequest.setTrangThai(0);
        //  hoaDonRequest.setGiaTriDiem(Integer.valueOf(hoaDonRequest.getThanhTien().intValue()/ct.getTiSo().intValue()));

//        HoaDon hoaDon=hoaDonServicee.findHoaDonbyID(hoaDonRequest.getId());
//
//        LichSuHoaDon lichSuHoaDon= new LichSuHoaDon();
//        lichSuHoaDon.setId(hoaDonRequest.getId());
//        lichSuHoaDon.setHoaDon(hoaDon);
////        lichSuHoaDon.setNguoiTao(hoaDonRequest.getNguoiDung());
//        lichSuHoaDon.setTrangThai(0);
//        lichSuHoaDon.setNgayTao(LocalDateTime.now());
//        lichSuHoaDonService.save(lichSuHoaDon);
        return  ResponseEntity.ok(banHangService.addHoaDonClient(hoaDonRequest));
    }
    @PostMapping("/addHDCT")
    public ResponseEntity<?> addHDCT(@RequestBody HoaDonChiTietRequest request){
        request.setNgayTao(LocalDateTime.now());
        request.setTrangThai(0);
        return ResponseEntity.ok(hoaDonChiTietService.addHDCTClient(request));
    }
    @PutMapping("/them-voucher/{idHD}/{idVoucher}")
    public ResponseEntity<?> updateVoucherToHD(@PathVariable("idHD") String idHD, @PathVariable("idVoucher") String idVoucher) {
        return ResponseEntity.ok(hoaDonServicee.addVoucherToHD(idHD,idVoucher));
    }

    //thanh toán hóa đơn client
    @PutMapping("/thanh-toan-hoa-don/{idHD}")
    public ResponseEntity<?> thanhToanHoaDon (@PathVariable("idHD") String idHD) {
        HoaDon hoaDon=hoaDonServicee.findHoaDonbyID(idHD);
        System.out.println("hóa đơn"+hoaDon.toString());
        LichSuHoaDon lichSuHoaDon= new LichSuHoaDon();
        lichSuHoaDon.setHoaDon(hoaDon);
//        lichSuHoaDon.setNguoiTao(hoaDon.getNguoiDung().getTen());
        lichSuHoaDon.setTrangThai(4);
        lichSuHoaDon.setNgayTao(LocalDateTime.now());
        lichSuHoaDonService.save(lichSuHoaDon);
        return ResponseEntity.ok(  hoaDonServicee.thanhToanHoaDon(idHD));
    }
    //thanh toán tiền mặt client
    @PostMapping("/thanh-toan-tien-mat")
    public ResponseEntity<?> thanhToan(@RequestBody ThanhToanRequest request){
        request.setNgayTao(LocalDateTime.now());
        request.setPhuongThuc(0);
        request.setTrangThai(0);
        HoaDon hd=hoaDonServicee.findHoaDonbyID(request.getHoaDon());
        System.out.println("hóa đơn tm"+hd);
        hd.setTrangThai(0);
        hd.setNgayMua(LocalDateTime.now());
        hoaDonRepository.save(hd);
        HoaDon hoaDon=hoaDonServicee.findHoaDonbyID(request.getHoaDon());

        LichSuHoaDon lichSuHoaDon= new LichSuHoaDon();
        lichSuHoaDon.setId(request.getHoaDon());
        lichSuHoaDon.setHoaDon(hoaDon);
//        lichSuHoaDon.setNguoiTao(hoaDonRequest.getNguoiDung());
        lichSuHoaDon.setTrangThai(0);
        lichSuHoaDon.setNgayTao(LocalDateTime.now());
        lichSuHoaDonService.save(lichSuHoaDon);
        return ResponseEntity.ok(thanhToanService.thanhToan(request));
    }
    @PostMapping("/thanh-toan-chuyen-khoan")
    public ResponseEntity<?> thanhToanCK(@RequestBody ThanhToanRequest request){
        request.setNgayTao(LocalDateTime.now());
        request.setPhuongThuc(1);
        request.setTrangThai(0);
        HoaDon hd=hoaDonServicee.findHoaDonbyID(request.getHoaDon());
        hd.setTrangThai(0);
        hd.setNgayMua(LocalDateTime.now());
        hoaDonRepository.save(hd);
        LichSuHoaDon lichSuHoaDon= new LichSuHoaDon();
        lichSuHoaDon.setHoaDon(HoaDon.builder().id(request.getHoaDon()).build());
//        lichSuHoaDon.setNguoiTao(hoaDon.getNguoiDung().getTen());
        lichSuHoaDon.setTrangThai(0);
        lichSuHoaDon.setNgayTao(LocalDateTime.now());
        lichSuHoaDonService.save(lichSuHoaDon);
        return ResponseEntity.ok(thanhToanService.thanhToan(request));
    }
    @PostMapping("/chuyen-khoan/{money}")
    public  Map<String, String>  createPayment(@PathVariable("money")String money) throws UnsupportedEncodingException {
        try {
            return payService.payWithVNPAY(money);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }


    @GetMapping("/payment-callback")
    public ResponseEntity<Boolean> paymentCallback(@RequestParam Map<String, String> queryParams, HttpServletResponse response) throws IOException {
        String vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
        if ("00".equals(vnp_ResponseCode)) {
            response.sendRedirect(BASE_FRONTEND_ENDPOINT + "/thanh-toan-thanh-cong");
            return ResponseEntity.ok(true);
        } else{
            response.sendRedirect(BASE_FRONTEND_ENDPOINT + "/thanh-toan-that-bai");
        }
        return ResponseEntity.ok(false);
    }


    @PostMapping("/check-out")
    public  HoaDon create(@RequestBody HoaDonClientRequest hoaDonClientRequest){
        return banHangService.createHoaDon(hoaDonClientRequest);
    }
}

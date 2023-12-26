package com.example.duanmishoes.controller;

import com.example.duanmishoes.entity.HoaDon;
import com.example.duanmishoes.entity.LichSuHoaDon;
import com.example.duanmishoes.service.HoaDonServicee;
import com.example.duanmishoes.service.LichSuHoaDonService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;


@CrossOrigin("http://localhost:3000/")
@RestController

@RequiredArgsConstructor
public class HoaDonControllerr {
    @Autowired
    private HoaDonServicee hoaDonService;
    @Autowired
    private LichSuHoaDonService lichSuHoaDonService;


    @GetMapping("/hoa-don")
    public ResponseEntity<?> getALL(){
        return new ResponseEntity<>(hoaDonService.getALL(), HttpStatus.FOUND);
    }
    @GetMapping("/hoa-don/{tt}")
    public ResponseEntity<?> getALLTT(@PathVariable("tt") int tt){
        return new ResponseEntity<>(hoaDonService.getALLTT(tt),HttpStatus.FOUND);
    }
    @GetMapping("/detail-hoa-don/{idHD}")
    public ResponseEntity<?> detailHD(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(hoaDonService.getByID(UUID.fromString(id)));
    }
    @GetMapping("/hoa-don/tim-kiem/{hehe}/{loaiHD}/{BD}/{KT}")
    public ResponseEntity<?> timHoaDon(@PathVariable("hehe") String tim,
                                       @PathVariable("loaiHD")int loai,
                                       @PathVariable("BD") String bd,
                                       @PathVariable("KT") String kt) throws ParseException {
        SimpleDateFormat sdf= new SimpleDateFormat("yyyy-MM-dd");
        Date d1= sdf.parse(bd);
        Date d2= sdf.parse(kt);
        java.sql.Date BD= new java.sql.Date(d1.getTime());
        java.sql.Date KT= new java.sql.Date(d2.getTime());
        return  ResponseEntity.ok(hoaDonService.timHoaDon(tim,loai,BD,KT));
    }
    @PutMapping("/update-hoa-don/{idHD}")
    public ResponseEntity<?> updateTTHDvaADDLSHD(@RequestBody LichSuHoaDon ls,@PathVariable("idHD") String id, HoaDon hd){
        HoaDon hoaDon=hoaDonService.findHoaDonbyID(id);
        ls.setTrangThai(hoaDon.getTrangThai()+1);
        ls.setNgayTao(LocalDateTime.now());
        ls.setHoaDon(hoaDon);
        ls.setMoTaHoatDong(ls.getMoTaHoatDong());
        lichSuHoaDonService.addLichSuHoaDon(ls);
        return ResponseEntity.ok(
                hoaDonService.updateHD(hd,id)
        );
    }
    @GetMapping("/detail-lich-su-hoa-don/{idHD}")
    public ResponseEntity<?> detailLSHD(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(lichSuHoaDonService.getLichHoaDon(UUID.fromString(id)));
    }
    @GetMapping("/ngay-hoa-don-time-line/{idHD}")
    public ResponseEntity<?> ngayTimeLine(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(lichSuHoaDonService.HoaDonTimeLine(UUID.fromString(id)));
    }
    @GetMapping("/hoa-don-san-pham/{idHD}")
    public ResponseEntity<?> SanPhamHoaDon(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(hoaDonService.detailHDSanPham(UUID.fromString(id)));
    }
//    public ResponseEntity<?> add(@RequestBody LichSuHoaDon khachHang){
//        return  ResponseEntity.ok(hoaDonService.addLichSuHoaDon(khachHang));
//    }
//    @PutMapping("/update/{ma}")
//    public ResponseEntity<?> update(@PathVariable String ma,@RequestBody LichSuHoaDon khachHang){
//        return   ResponseEntity.ok(khachHangService.update(khachHang,ma));
//    }
//    @DeleteMapping("/delete/{ma}")
//    public ResponseEntity<?> delete(@PathVariable String ma){
//        return  ResponseEntity.ok(khachHangService.delete(ma));
//    }
}

package com.example.backend.controller;


import com.example.backend.dto.request.HoaDonRequest;
import com.example.backend.dto.request.LichSuHoaDonRequest;
import com.example.backend.dto.request.hoadonsearch.HoaDonSearch;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.LichSuHoaDon;
import com.example.backend.service.HoaDonServicee;
import com.example.backend.service.LichSuHoaDonService;
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
        return  ResponseEntity.ok(hoaDonService.getByID(id));
    }
    @PostMapping("/hoa-don/search")
    public ResponseEntity<?> timHoaDon(@RequestBody HoaDonSearch hoaDonSearch)  {
        System.out.println(hoaDonSearch.toString());
        return  ResponseEntity.ok(hoaDonService.getTim(hoaDonSearch));
    }
    @PutMapping("/update-hoa-don/{idHD}")
    public ResponseEntity<?> updateTTHDvaADDLSHD(@RequestBody LichSuHoaDonRequest ls, @PathVariable("idHD") String id, HoaDon hd){
        HoaDon hoaDon=hoaDonService.findHoaDonbyID(id);
        ls.setTrangThai(hoaDon.getTrangThai()+1);
        ls.setNgayTao(LocalDateTime.now());
        ls.setIdHD(id);
        ls.setNguoiTao("Dương");
        ls.setMoTaHoatDong(ls.getMoTaHoatDong());
        lichSuHoaDonService.addLichSuHoaDon(ls);
        return ResponseEntity.ok(
                hoaDonService.updateHD(hd,id)
        );
    }
    @GetMapping("/detail-lich-su-hoa-don/{idHD}")
    public ResponseEntity<?> detailLSHD(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(lichSuHoaDonService.getLichHoaDon(id));
    }
    @GetMapping("/ngay-hoa-don-time-line/{idHD}")
    public ResponseEntity<?> ngayTimeLine(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(lichSuHoaDonService.HoaDonTimeLine(id));
    }
    @GetMapping("/hoa-don-san-pham/{idHD}")
    public ResponseEntity<?> SanPhamHoaDon(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(hoaDonService.detailHDSanPham(id));
    }
    @PostMapping("/hoa-don/add")
    public ResponseEntity<?> add(@RequestBody HoaDonRequest hoaDonRequest){
        hoaDonRequest.setNgayMua(LocalDateTime.now());
        hoaDonRequest.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(hoaDonService.add(hoaDonRequest));
    }
//    @PutMapping("/update/{ma}")
//    public ResponseEntity<?> update(@PathVariable String ma,@RequestBody LichSuHoaDon khachHang){
//        return   ResponseEntity.ok(khachHangService.update(khachHang,ma));
//    }
//    @DeleteMapping("/delete/{ma}")
//    public ResponseEntity<?> delete(@PathVariable String ma){
//        return  ResponseEntity.ok(khachHangService.delete(ma));
//    }
}

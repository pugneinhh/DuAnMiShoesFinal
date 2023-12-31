package com.example.backend.controller;

import com.example.backend.dto.request.VoucherRequest;
import com.example.backend.entity.Voucher;
import com.example.backend.dto.request.VoucherSearch;
import com.example.backend.service.VoucherService;
import com.example.backend.util.Status;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/voucher")
@RequiredArgsConstructor
public class VoucherController {
    @Autowired
    VoucherService vs;
    @GetMapping("/hien-thi")
    public ResponseEntity<?> getALL(){
//        vs.checkHan();
        return ResponseEntity.ok(vs.getAll());
    }
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody VoucherRequest request){
        LocalDateTime lc= LocalDateTime.now();
        if(request.getNgayBatDau().compareTo(lc)>0){
            request.setTrangThai(Status.SAP_DIEN_RA);
        }else{
            request.setTrangThai(Status.DANG_HOAT_DONG);
        }
        request.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(vs.addVoucher(request));
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id,@RequestBody VoucherRequest request){
        request.setId(id);
        LocalDateTime lc= LocalDateTime.now();
        if(request.getNgayBatDau().compareTo(lc)>0){
            request.setTrangThai(Status.SAP_DIEN_RA);
        }else if(request.getNgayBatDau().compareTo(lc)==0){
            request.setTrangThai(Status.DANG_HOAT_DONG);
        }else{
            request.setTrangThai(Status.NGUNG_HOAT_DONG);
        }
        request.setNgaySua(LocalDateTime.now());
        return  ResponseEntity.ok(vs.addVoucher(request));
    }
    @GetMapping("/detail/{idV}")
    public ResponseEntity<?> detail(@PathVariable("idV") String id){
        return ResponseEntity.ok(vs.detailVoucher(id));

    }
    @GetMapping("/tim-voucher/{key}/{ngayBD}/{ngayKT}")
    public ResponseEntity<?> tim(@PathVariable("key")String key,
                                 @PathVariable("ngayBD")String ngayBD,
                                 @PathVariable("ngayKT")String ngayKT) throws ParseException {
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date d1=sdf.parse(ngayBD);
        java.util.Date d2=sdf.parse(ngayKT);
        Date dBD=new Date(d1.getTime());
        Date dKT=new Date(d2.getTime());
        return  ResponseEntity.ok(vs.getTim(key,dBD,dKT));
    }
    @PostMapping("/search-voucher")
    public ResponseEntity<?> search(@RequestBody VoucherSearch voucherSearch){
        return ResponseEntity.ok(vs.getSearch(voucherSearch));
    }
}

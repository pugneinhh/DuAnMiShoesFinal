package com.example.duanmishoes.controller;

import com.example.duanmishoes.entity.Voucher;
import com.example.duanmishoes.model.VoucherSearch;
import com.example.duanmishoes.service.VoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.UUID;

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
    public ResponseEntity<?> add(@RequestBody Voucher v){
        if(v.getLoaiVoucher()==null){
            v.setLoaiVoucher("false");
        }
        LocalDateTime lc= LocalDateTime.now();
        if(v.getNgayBatDau().compareTo(lc)>0){
            v.setTrangThai(0);
        }else{
            v.setTrangThai(1);
        }
        v.setNgayTao(new Date(new java.util.Date().getTime()));
        return  ResponseEntity.ok(vs.addVoucher(v));
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id,@RequestBody Voucher v){
        v.setId(id);
        v.setNgaySua(new Date(new java.util.Date().getTime()));
        return  ResponseEntity.ok(vs.addVoucher(v));
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

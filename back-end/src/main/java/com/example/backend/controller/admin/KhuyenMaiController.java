package com.example.backend.controller.admin;


import com.example.backend.dto.request.KhuyenMaiRequest;
import com.example.backend.dto.request.KhuyenMaiSearch;
import com.example.backend.entity.KhuyenMai;
import com.example.backend.service.CTSPService;
import com.example.backend.service.KhuyenMaiService;
//import com.example.duanmishoes.util.ScheduledCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/khuyen-mai")
@RequiredArgsConstructor
public class KhuyenMaiController {
    @Autowired
    KhuyenMaiService khuyenMaiService;
    @Autowired
    CTSPService ctspService;
//    private ScheduledCheck scheduledCheck;
    @GetMapping("hien-thi")
    public ResponseEntity<?> getALL(){
//        scheduledCheck.checkKhuyenMai();
        return new ResponseEntity<>(khuyenMaiService.getAllKhuyenMai(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody KhuyenMaiRequest request){
        KhuyenMai km = request.map();
        System.out.println(km.getId()+""+km.getMa()+""+km.getTen()+""+km.getLoai()+""+km.getNgay_bat_dau()+""+km.getNgay_ket_thuc()+""+km.getGia_tri_khuyen_mai());
        km.setNgayTao(new Date(new java.util.Date().getTime()));
        LocalDateTime ngayBD =  khuyenMaiService.convertTime(km.getNgay_bat_dau());
        LocalDateTime ngayKT = khuyenMaiService.convertTime(km.getNgay_ket_thuc());
        LocalDateTime today = LocalDateTime.now();
        System.out.println("Today"+today);
        System.out.println("Bắt đầu"+ngayBD);
        System.out.println("Kết thúc"+ngayKT);
        if (ngayBD.isAfter(today)) km.setTrangThai(0);
        else if (ngayBD.isBefore(today) && ngayKT.isAfter(today)) km.setTrangThai(1);
        else if (ngayKT.isBefore(today)) km.setTrangThai(2);
        km.setNgay_bat_dau(khuyenMaiService.convertTime(km.getNgay_bat_dau()));
        km.setNgay_ket_thuc(khuyenMaiService.convertTime(km.getNgay_ket_thuc()));

        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id,@RequestBody KhuyenMaiRequest request){
        KhuyenMai km = request.map();
        km.setId(id);
        LocalDateTime ngayBD =  khuyenMaiService.convertTime(km.getNgay_bat_dau());
        LocalDateTime ngayKT =  khuyenMaiService.convertTime(km.getNgay_ket_thuc());
        LocalDateTime today = LocalDateTime.now();
        System.out.println("Update ngày bắt đầu"+ngayBD);
        System.out.println("Update ngày kết thúc"+ngayKT);
        System.out.println("Update ngày hiện tại"+today);
        System.out.println("trang thai"+khuyenMaiService.detailKhuyenMai(id).getTrangThai());
        if (khuyenMaiService.detailKhuyenMai(id).getTrangThai() != 3){
            if (ngayBD.isAfter(today)) km.setTrangThai(0);
            else if (ngayBD.isBefore(today) && ngayKT.isAfter(today)) km.setTrangThai(1);
            else if (ngayKT.isBefore(today)) km.setTrangThai(2);
        }
        km.setNgay_bat_dau(ngayBD);
        km.setNgay_ket_thuc(ngayKT);
        km.setNgaySua(new Date(new java.util.Date().getTime()));
        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") String id){
        return ResponseEntity.ok(khuyenMaiService.detailKhuyenMai(id));

    }

    @PutMapping("/updateTrangThai/{id}")
    public ResponseEntity<?> updateTrangThai(@PathVariable("id") String id , @RequestBody KhuyenMaiRequest request){
        KhuyenMai km = request.map();
        km.setId(id);
        LocalDateTime ngayKT =  khuyenMaiService.convertTimeForUpdate(km.getNgay_ket_thuc());
        LocalDateTime today = LocalDateTime.now();
        if (ngayKT.isBefore(today)){
            List<String> list = ctspService.getCTSPByKM(id);
            for (String x: list) {
                ctspService.deleteKM(x);
            }
        }
        km.setTrangThai(2);
        km.setNgaySua(new Date(new java.util.Date().getTime()));
        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }


    @PutMapping("/updateTrangThai1/{id}")
    public ResponseEntity<?> updateTrangThai1(@PathVariable("id") String id ,@RequestBody KhuyenMaiRequest request){
        KhuyenMai km = request.map();
        km.setId(id);
        if(km.getTrangThai() != 3) {
            if (km.getNgay_bat_dau().isAfter(LocalDateTime.now()))
                km.setTrangThai(0);
            else km.setTrangThai(1);
            km.setNgaySua(new Date(new java.util.Date().getTime()));
        }
        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }

    @PutMapping("/updateTrangThai2/{id}")
    public ResponseEntity<?> updateTrangThai2(@PathVariable("id") String id , @RequestBody KhuyenMaiRequest request){
        KhuyenMai km = request.map();
        km.setId(id);
        km.setTrangThai(3);
        km.setNgaySua(new Date(new java.util.Date().getTime()));
        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }

    @PutMapping("/updateTrangThai3/{id}")
    public ResponseEntity<?> updateTrangThai3(@PathVariable("id") String id , @RequestBody KhuyenMaiRequest request){
        KhuyenMai km = request.map();
        km.setId(id);
        if (km.getNgay_bat_dau().isAfter(LocalDateTime.now()))
            km.setTrangThai(0);
        else km.setTrangThai(1);
        km.setNgaySua(new Date(new java.util.Date().getTime()));
        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }
    @PostMapping("/search-khuyen-mai")
    public ResponseEntity<?> search(@RequestBody KhuyenMaiSearch khuyenMaiSearch){
        return ResponseEntity.ok(khuyenMaiService.getSearch(khuyenMaiSearch));
    }
}

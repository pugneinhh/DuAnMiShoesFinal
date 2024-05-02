package com.example.backend.controller.admin;


import com.example.backend.dto.request.KhuyenMaiRequest;
import com.example.backend.dto.request.KhuyenMaiSearch;
import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.entity.HoaDonChiTiet;
import com.example.backend.entity.KhuyenMai;
import com.example.backend.entity.KhuyenMaiSanPham;
import com.example.backend.service.CTSPService;
import com.example.backend.service.HoaDonChiTietService;
import com.example.backend.service.KhuyenMaiSanPhamService;
import com.example.backend.service.KhuyenMaiService;
//import com.example.duanmishoes.util.ScheduledCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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
    @Autowired
    HoaDonChiTietService hoaDonChiTietService;
    @Autowired
    KhuyenMaiSanPhamService khuyenMaiSanPhamService;

//    private ScheduledCheck scheduledCheck;
    @GetMapping("hien-thi")
    public ResponseEntity<?> getALL(){
//        scheduledCheck.checkKhuyenMai();
        return  ResponseEntity.ok(khuyenMaiService.getAllKhuyenMai());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody KhuyenMaiRequest request){
        KhuyenMai km = request.map();

        km.setNgayTao(new Date(new java.util.Date().getTime()));
        LocalDateTime ngayBD =  khuyenMaiService.convertTime(km.getNgay_bat_dau());
        LocalDateTime ngayKT = khuyenMaiService.convertTime(km.getNgay_ket_thuc());
        LocalDateTime today = LocalDateTime.now();

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

    @PutMapping("/updateTrangThai/{id}") // tự động update khi khuyến mại hết hạn
    public ResponseEntity<?> updateTrangThai(@PathVariable("id") String id , @RequestBody KhuyenMaiRequest request){
        KhuyenMai km = request.map();
        km.setId(id);
        LocalDateTime ngayKT =  khuyenMaiService.convertTimeForUpdate(km.getNgay_ket_thuc());
        LocalDateTime today = LocalDateTime.now();
        if (ngayKT.isBefore(today)){ // ngày kết thúc trước ngày hiện tại => kết thúc khuyến mại
            List<String> list = ctspService.getCTSPByKM(id);
            for (String x: list) {
                ChiTietSanPham ctsp = ctspService.findChiTietSanPhamByID(x);
                ctspService.deleteKM(x,id); // xóa khuyến mại ở ctsp
                for (HoaDonChiTiet h : hoaDonChiTietService.getAllHDCTByIDCTSP(x)) { // kiểm tra hóa đơn chi tiết chưa thanh toán
                    if(h.getTrangThai() == 0) {
                        hoaDonChiTietService.updateGia(x,new BigDecimal(0),ctsp.getGiaBan()); // trả về giá nguyên

                    }
                }

            }
        }
        km.setTrangThai(2); // gắn khuyến mại với giá trị 2 - đã kết thúc
        km.setNgaySua(new Date(new java.util.Date().getTime()));
        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }


    @PutMapping("/updateTrangThai1/{id}") // tự động update sắp diễn ra / diễn ra
    public ResponseEntity<?> updateTrangThai1(@PathVariable("id") String id ,@RequestBody KhuyenMaiRequest request){
        KhuyenMai km = request.map();
        km.setId(id);
        if(km.getTrangThai() != 3) { // kiểm tra trạng thái có bằng 3 - tạm  dừng hay không
            if (km.getNgay_bat_dau().isAfter(LocalDateTime.now())) // ngày bắt đầu sau ngày hiện tại
                km.setTrangThai(0); // => sắp diễn ra
            else km.setTrangThai(1); // => đang dễn ra
            km.setNgaySua(new Date(new java.util.Date().getTime()));
        }
        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }

    @PutMapping("/updateTrangThai2/{id}") // tạm dừng khuyến mại
    public ResponseEntity<?> updateTrangThai2(@PathVariable("id") String id , @RequestBody KhuyenMaiRequest request){
        KhuyenMai km = request.map();
        km.setId(id);
        km.setTrangThai(3);
        km.setNgaySua(new Date(new java.util.Date().getTime()));
        List<KhuyenMaiSanPham> list = khuyenMaiSanPhamService.getListCTSPByKM(id);
        for (KhuyenMaiSanPham x : list){
            x.setTrangThai(3);
            khuyenMaiSanPhamService.add(x);
        }
        List<ChiTietSanPham>  listCTPS = ctspService.getALL();
        for (ChiTietSanPham c : listCTPS){
            if (c.getKhuyenMai() != null && c.getKhuyenMai().getId().equals(id)){
                c.setKhuyenMai(null);
                ctspService.updateCTSP(c);
                hoaDonChiTietService.updateGia(c.getId(),new BigDecimal("0"),c.getGiaBan());

            }
        }
        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }

    @PutMapping("/updateTrangThai3/{id}")
    public ResponseEntity<?> updateTrangThai3(@PathVariable("id") String id , @RequestBody KhuyenMaiRequest request){
        KhuyenMai km = request.map();
        km.setId(id);
        List<KhuyenMaiSanPham> list = khuyenMaiSanPhamService.getListCTSPByKM(id);
        for (KhuyenMaiSanPham x : list) {
            x.setTrangThai(1);
            khuyenMaiSanPhamService.add(x);
//
//            BigDecimal giaGiam = x.getKhuyenMai().getLoai().equals("Tiền mặt") ? x.getKhuyenMai().getGia_tri_khuyen_mai()
//                    : (x.getChiTietSanPham().getGiaBan().multiply(x.getKhuyenMai().getGia_tri_khuyen_mai().divide(new BigDecimal("100"))));
//            BigDecimal giaSauGiam = x.getChiTietSanPham().getGiaBan().subtract(giaGiam);
//            hoaDonChiTietService.updateGia(x.getChiTietSanPham().getId(), giaGiam, giaSauGiam);

        }
            if (km.getNgay_bat_dau().isAfter(LocalDateTime.now()))
                km.setTrangThai(0);
            else {
                km.setTrangThai(1);
            }

        km.setNgaySua(new Date(new java.util.Date().getTime()));
        return  ResponseEntity.ok(khuyenMaiService.addKhuyenMai(km));
    }
    @PostMapping("/search-khuyen-mai")
    public ResponseEntity<?> search(@RequestBody KhuyenMaiSearch khuyenMaiSearch){
        return ResponseEntity.ok(khuyenMaiService.getSearch(khuyenMaiSearch));
    }
}

package com.example.backend.controller.admin;

import com.example.backend.dto.request.HoaDonChiTietRequest;
import com.example.backend.dto.request.HoaDonRequest;
import com.example.backend.dto.request.LichSuHoaDonRequest;
import com.example.backend.dto.response.ChiTietSanPhamForBanHang;
import com.example.backend.entity.*;
import com.example.backend.repository.CTSPRepository;
import com.example.backend.repository.CongThucRepository;
import com.example.backend.service.*;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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
    @Autowired
    VoucherService voucherService;

    @Autowired
    HoaDonServicee hoaDonServicee;
    @Autowired
    NguoiDungService nguoiDungService;
    @Autowired
    LichSuHoaDonService lichSuHoaDonService;

    @GetMapping("/getHoaDonChoTaiQuay")
    public ResponseEntity<?> getHoaDonChoTaiQuay(){
        return ResponseEntity.ok(hoaDonServicee.getHoaDonChoTaiQuay());
    }
    @GetMapping("/getALLCTSP")
    public ResponseEntity<?> getALLctsp(){
        List<ChiTietSanPhamForBanHang> list=banHangService.getALLCTSPBanHang();
        return ResponseEntity.ok(list);
    }
    @PostMapping("/add-hoa-don")
    public  ResponseEntity<?> addHD(@RequestBody HoaDonRequest hoaDonRequest){

        CongThuc ct=congThucRepository.getCongThucByTrangThai(0);
       // hoaDonRequest.setMa("HDTQ"+ RandomStringUtils.randomNumeric(6));
        hoaDonRequest.setLoaiHoaDon(1);
        hoaDonRequest.setNgayTao(LocalDateTime.now());
        hoaDonRequest.setTrangThai(0);
      //  hoaDonRequest.setGiaTriDiem(Integer.valueOf(hoaDonRequest.getThanhTien().intValue()/ct.getTiSo().intValue()));
        banHangService.addHoaDon(hoaDonRequest);
        HoaDon hoaDon=hoaDonServicee.findHoaDonbyID(hoaDonRequest.getId());

        LichSuHoaDon lichSuHoaDon= new LichSuHoaDon();
        lichSuHoaDon.setId(hoaDonRequest.getId());
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setNguoiTao(hoaDonRequest.getNhanVien());
        lichSuHoaDon.setTrangThai(0);
        lichSuHoaDon.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(lichSuHoaDonService.save(lichSuHoaDon));

    }
    @PostMapping("/addHDCT")
    public ResponseEntity<?> addHDCT(@RequestBody HoaDonChiTietRequest request){
        return ResponseEntity.ok(hoaDonChiTietService.addHDCT(request));
    }
    @PostMapping("/update-so-luong-hdct")
    public ResponseEntity<?> updateSLHDCT(@RequestBody HoaDonChiTietRequest request){
        return ResponseEntity.ok(hoaDonChiTietService.updateTruSl(request));
    }
    @PostMapping("/delete-hdct")
    public ResponseEntity<?> deleteHDCT(@RequestBody HoaDonChiTietRequest request){
        return ResponseEntity.ok(hoaDonChiTietService.deleteHDCT(request));
    }
    @DeleteMapping("/delete-hoa-don-chi-tiet/{idCTSP}/{idHD}")
    public void  deleteHoaDonChiTiet (@PathVariable("idCTSP") String idCTSP,@PathVariable("idHD")String idHD) {
        hoaDonChiTietService.deleteHDCTAndRollBackInSell(idCTSP,idHD); //  roll backed
    }
    @PostMapping("/thanh-toan")
    public ResponseEntity<?> thanhToan(@PathVariable HoaDonRequest hoaDonRequest){
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
    @PutMapping("/hoa-don/update-thanh-tien/{idHD}")
    public ResponseEntity<?> updateThanhTien(String idHD) {
        return ResponseEntity.ok(hoaDonServicee.updateThanhTien(idHD));
    }
    @GetMapping("/hoa-don/hoa-don-cho")
    public ResponseEntity<?> getAllBill(){
        return ResponseEntity.ok(hoaDonServicee.getAllBill());
    }

    @GetMapping("/hoa-don/hoa-don-cho-hom-nay")
    public ResponseEntity<?> getAllBillToday(){
        return ResponseEntity.ok(hoaDonServicee.getAllBillToday());
    }
    @GetMapping("/voucher/{idND}")
    public ResponseEntity<?> getAllVoucherWithIDKH(@PathVariable("idND")String idND){
        return ResponseEntity.ok(voucherService.getVoucherBanHang(idND));
    }


    @GetMapping("/voucher/no-limited")
    public ResponseEntity<?> getAllVoucherNoLimited(){
        return ResponseEntity.ok(voucherService.noLimited());
    }

    @PutMapping("/hoa-don/updateSL/{idCTSP}/{idHD}/{value}")
    public ResponseEntity<?> updateSL (@PathVariable("idCTSP")String idCTSP,@PathVariable("idHD") String idHD,@PathVariable("value") int value) {

        return ResponseEntity.ok(hoaDonChiTietService.updateSL(idCTSP,idHD,value));
    }

    @PutMapping("/hoa-don/update-van-chuyen/{idHD}")
    public ResponseEntity<?> updateVanChuyen (@PathVariable("idHD")String idHD, @RequestBody HoaDon hd){
        return ResponseEntity.ok(hoaDonServicee.update(hd,idHD));
    }

    @PutMapping("/hoa-don/them-voucher/{idHD}/{idVoucher}")
    public ResponseEntity<?> updateVoucherToHD(@PathVariable("idHD") String idHD, @PathVariable("idVoucher") String idVoucher) {
        return ResponseEntity.ok(hoaDonServicee.addVoucherToHD(idHD,idVoucher));
    }

    @GetMapping("/voucher-hop-le/{total}")
    public ResponseEntity<?> getVoucherHopLe(@PathVariable("total")String total){
        BigDecimal tien=BigDecimal.valueOf(Double.valueOf(total));
        return ResponseEntity.ok(voucherService.getVoucherHopLe(tien));
    }
    @PostMapping("/voucher/updateTruSLVoucher/{id}")
    public ResponseEntity<?> updateTruSLVoucher(@PathVariable("id")String id){
        return ResponseEntity.ok(voucherService.updateTruSL(id));
    }
    @PostMapping("/voucher/updateCongSLVoucher/{id}")
    public ResponseEntity<?> updateCongSLVoucher(@PathVariable("id")String id){
        return ResponseEntity.ok(voucherService.updateCongSL(id));
    }


    @PutMapping("/nguoi-dung/update-nguoi-dung/{idHD}/{idND}")
    public  ResponseEntity<?> updateNguoiDung(@PathVariable("idHD")String idHD,@PathVariable("idND")String idND) {
        return ResponseEntity.ok(hoaDonServicee.updateKH(idHD,idND));
    }

    @PutMapping("/nguoi-dung/update-khach-le/{idHD}")
    public  ResponseEntity<?> updateNguoiDung(@PathVariable("idHD")String idHD) {
        return ResponseEntity.ok(hoaDonServicee.updateReturnKhachLe(idHD));
    }

    @PostMapping("/addHDClient")
    public  ResponseEntity<?> addHDClient(@RequestBody HoaDonRequest request) {
        request.setLoaiHoaDon(0);
        return ResponseEntity.ok(hoaDonServicee.add(request));
    }

    @PostMapping("/lich-su-hoa-don/them")
    public ResponseEntity<?> themLichSuHoaDon (@RequestBody LichSuHoaDonRequest lichSuHoaDonRequest){
        return ResponseEntity.ok(lichSuHoaDonService.addLichSuHoaDon(lichSuHoaDonRequest));
    }

    @PutMapping("/thanh-toan/hoa-don/{idHD}/{idNV}")
    public ResponseEntity<?> thanhToanHoaDon (@PathVariable("idHD") String idHD,@PathVariable("idNV") String idNV ) {
        HoaDon hoaDon=hoaDonServicee.findHoaDonbyID(idHD);
<<<<<<< HEAD
        NguoiDung nguoiDung = nguoiDungService.findByID(idNV);
=======
>>>>>>> developer
        LichSuHoaDon lichSuHoaDon= new LichSuHoaDon();
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setNguoiTao(nguoiDung.getMa());
        lichSuHoaDon.setTrangThai(4);
        lichSuHoaDon.setNgayTao(LocalDateTime.now());
        lichSuHoaDonService.save(lichSuHoaDon);
        return ResponseEntity.ok(  hoaDonServicee.thanhToanHoaDon(idHD));
       
    }
}

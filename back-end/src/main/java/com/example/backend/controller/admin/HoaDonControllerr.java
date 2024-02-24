package com.example.backend.controller.admin;


import com.example.backend.dto.request.HoaDonRequest;
import com.example.backend.dto.request.LichSuHoaDonRequest;
import com.example.backend.dto.request.hoadonsearch.HoaDonSearch;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.LichSuHoaDon;
import com.example.backend.entity.ThanhToan;
import com.example.backend.entity.Voucher;
import com.example.backend.service.HoaDonServicee;
import com.example.backend.service.LichSuHoaDonService;
import com.example.backend.service.ThanhToanService;
import com.example.backend.service.VoucherService;
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
@RequestMapping("/admin/hoa-don")
@RequiredArgsConstructor
public class HoaDonControllerr {
    @Autowired
    private HoaDonServicee hoaDonService;
    @Autowired
    private LichSuHoaDonService lichSuHoaDonService;
    @Autowired
    private VoucherService voucherService;
    @Autowired
    private ThanhToanService thanhToanService;
    @GetMapping()
    public ResponseEntity<?> getALL(){
        return  ResponseEntity.ok(hoaDonService.getALL());
    }
    @GetMapping("/{tt}")
    public ResponseEntity<?> getALLTT(@PathVariable("tt") int tt){
        return  ResponseEntity.ok(hoaDonService.getALLTT(tt));
    }
    @GetMapping("/detail-hoa-don/{idHD}")
    public ResponseEntity<?> detailHD(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(hoaDonService.getByID(id));
    }
    @PostMapping("/search")
    public ResponseEntity<?> timHoaDon(@RequestBody HoaDonSearch hoaDonSearch)  {
        System.out.println(hoaDonSearch.toString());
        return  ResponseEntity.ok(hoaDonService.getTim(hoaDonSearch));
    }
    @PutMapping("/update-hoa-don/{idHD}/{maNV}")
    public ResponseEntity<?> updateTTHDvaADDLSHD(@RequestBody LichSuHoaDonRequest ls, @PathVariable("idHD") String id, @PathVariable("maNV") String maNV ){
        HoaDon hoaDon=hoaDonService.findHoaDonbyID(id);
        ls.setNgayTao(LocalDateTime.now());
        ls.setIdHD(id);
        ls.setNguoiTao(maNV);
        ls.setMoTaHoatDong(ls.getMoTaHoatDong());
        System.out.println("trang thai ban dau hd"+hoaDon.getTrangThai());
        System.out.println("trang thai ban dau hoadon"+hoaDon.getTrangThai());
        ThanhToan thanhToan= thanhToanService.getThanhToanByIdHD(id);

        if(hoaDon.getTrangThai()==4&&thanhToan.getPhuongThucVnp()!=null){
            hoaDon.setTrangThai(0);
            ls.setTrangThai(0);
            System.out.println("if 1");
            lichSuHoaDonService.addLichSuHoaDon(ls);
            return ResponseEntity.ok(
                    hoaDonService.updateHD(hoaDon,id)
            );
        }
        else if(hoaDon.getTrangThai()==3&&thanhToan.getPhuongThucVnp()!=null){
            ls.setTrangThai(5);
            hoaDon.setTrangThai(5);
            System.out.println("if 2");
            lichSuHoaDonService.addLichSuHoaDon(ls);
            return ResponseEntity.ok(
                    hoaDonService.updateHD(hoaDon,id)
            );
        }
        if(thanhToan.getPhuongThucVnp()==null){
            ls.setTrangThai(hoaDon.getTrangThai()+1);
            hoaDon.setTrangThai(hoaDon.getTrangThai()+1);
        }



        lichSuHoaDonService.addLichSuHoaDon(ls);
        return ResponseEntity.ok(hoaDonService.updateHD(hoaDon,id));
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
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody HoaDonRequest hoaDonRequest){
        hoaDonRequest.setNgayMua(LocalDateTime.now());
        hoaDonRequest.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(hoaDonService.add(hoaDonRequest));
    }

    @PutMapping("/huy-hoa-don/{idHD}")
    public ResponseEntity<?> HuyHoaDon(@PathVariable("idHD") String idHD) {
        return  ResponseEntity.ok(hoaDonService.deleteHoaDon(idHD));
    }
//    @PutMapping("/update/{ma}")
//    public ResponseEntity<?> update(@PathVariable String ma,@RequestBody LichSuHoaDon khachHang){
//        return   ResponseEntity.ok(khachHangService.update(khachHang,ma));
//    }
//    @DeleteMapping("/delete/{ma}")
//    public ResponseEntity<?> delete(@PathVariable String ma){
//        return  ResponseEntity.ok(khachHangService.delete(ma));
//    }
    @PutMapping("/thanh-toan-hoa-don/{iHD}")
    public ResponseEntity<?> ThanhToanHoaDon(@PathVariable("idHD") String idHD){
        HoaDon hoaDon = hoaDonService.findHoaDonbyID(idHD);
        hoaDon.setTrangThai(4);
        LichSuHoaDonRequest lichSuHoaDonRequest = new LichSuHoaDonRequest();
        lichSuHoaDonRequest.setIdHD(idHD);
        lichSuHoaDonRequest.setTrangThai(4);
        lichSuHoaDonRequest.setNgayTao(LocalDateTime.now());
        lichSuHoaDonRequest.setNguoiTao(hoaDon.getNguoiTao());
        lichSuHoaDonService.addLichSuHoaDon(lichSuHoaDonRequest);
        if (hoaDon.getVoucher() != null) {
            Voucher voucher = voucherService.detailVoucher(hoaDon.getVoucher().getId());
            voucher.setSoLuong(voucher.getSoLuong() -1 );
            voucherService.add(voucher);
        }
        return ResponseEntity.ok(hoaDonService.addHoaDon(hoaDon));
    }
}

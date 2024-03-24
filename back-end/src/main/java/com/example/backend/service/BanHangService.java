package com.example.backend.service;

import com.example.backend.dto.request.HoaDonRequest;
import com.example.backend.dto.response.ChiTietSanPhamForBanHang;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.NguoiDung;
import com.example.backend.repository.CTSPRepository;
import com.example.backend.repository.HoaDonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BanHangService {
    @Autowired
    HoaDonRepository hoaDonRepository;
    @Autowired
    CTSPRepository ctspRepository;
    @Autowired
    ThongBaoService thongBaoService;
    @Autowired
    KhachHangService khachHangService;

   public List<ChiTietSanPhamForBanHang> getALLCTSPBanHang(){
        return ctspRepository.getALLCTSPBanHang();
    }

    public HoaDon addHoaDon(HoaDonRequest hoaDonRequest){
       HoaDon hd =hoaDonRequest.map(new HoaDon());
       return hoaDonRepository.save(hd);
    }
    public HoaDon addHoaDonClient(HoaDonRequest hoaDonRequest){
        HoaDon hd =hoaDonRequest.map(new HoaDon());
        HoaDon hd2 =  hoaDonRepository.save(hd);
        thongBaoService.thanhToan(hd2.getId());
        return hd2;
    }

//    public HoaDon createHoaDon(HoaDonRequest hoaDonRequest) {
//
//        NguoiDung kh = this.khachHangService.getByID(hoaDonRequest.getNguoiDung()).get();
//        DiaChi diaChi = khDiaChiRepo.findDiaChiByIdUserAndTrangThai(kh.getId());
//
//
//
//        Random random = new Random();
//        int randomNumber = random.nextInt(9000) + 1000;
//
//        LocalDateTime ngayThanhToan;
//
//        if (hoaDonRequest.getIdPayMethod() == 2) {
//            ngayThanhToan = DatetimeUtil.getCurrentDateAndTimeLocal();
//        } else {
//            ngayThanhToan = null;
//        }
//
//        BigDecimal tienSauGiam;
//        if(hoaDonRequest.getTienSauGiam() == null || hoaDonRequest.getTienSauGiam().compareTo(BigDecimal.ZERO) == 0){
//            tienSauGiam = hoaDonRequest.getTongTien();
//        }else{
//            tienSauGiam = hoaDonRequest.getTienSauGiam();
//        }
//
//
//        HoaDon hoaDon = HoaDon.builder()
//                .user(kh)
//                .diaChi(diaChi)
//                .tongTien(hoaDonRequest.getTongTien())
//                .tenNguoiNhan(kh.getTen())
//                .ngayTao(DatetimeUtil.getCurrentDateAndTimeLocal())
//                .tienShip(hoaDonRequest.getTienShip())
//                .ngayThanhToan(ngayThanhToan)
//                .tienSauKhiGiam(tienSauGiam)
//                .hinhThucGiaoHang(HinhThucGiaoHangStatus.GIAOHANG)
//                .trangThai(HoaDonStatus.YEU_CAU_XAC_NHAN)
//                .phuongThucThanhToan(PhuongThucThanhToan.builder().id(hoaDonRequest.getIdPayMethod()).build())
//                .build();
//
////        hoaDon.setMa("HD".concat(new HoaDon().getId().toString()));
//
//        if(hoaDonRequest.getIdVoucher() != null) {
//            Voucher voucher = voucherRepo.findAllById(hoaDonRequest.getIdVoucher()).get();
//            hoaDon.setVoucher(voucher);
//        }
//
//        HoaDon saveHoaDon = khHoaDonRepo.save(hoaDon);
//        saveHoaDon.setMa("HD" + saveHoaDon.getId().toString());
//        khHoaDonRepo.save(saveHoaDon);
//
//        if(hoaDonRequest.getIdVoucher() != null) {
//            Voucher voucher = voucherRepo.findAllById(hoaDonRequest.getIdVoucher()).get();
//            voucher.setSoLuong(voucher.getSoLuong() - 1);
//            if(voucher.getSoLuong() == 0){
//                voucher.setTrangThai(2);
//            }
//            voucherRepo.save(voucher);
//        }
//
//        for (KHHoaDonChiTietRequest request : hoaDonRequest.getListHDCT()) {
//
//            SanPhamChiTiet spct = chiTietSPRepo.findById(request.getIdCTSP()).get();
//
//            if (spct.getSoLuongTon() < request.getSoLuong()) {
//                throw new RuntimeException("So luong khong du");
//            }
//
//            HoaDonChiTiet hdct = HoaDonChiTiet.builder()
//                    .sanPhamChiTiet(spct)
//                    .ma("HDCT" + randomNumber)
//                    .soLuong(request.getSoLuong())
//                    .donGia(spct.getGiaSauGiam() == null ? spct.getGiaBan() : spct.getGiaSauGiam())
//                    .trangThai(HoaDonStatus.YEU_CAU_XAC_NHAN)
//                    .hoaDon(hoaDon)
//                    .build();
//
//            hoaDonChiTietRepo.save(hdct);
//
//            spct.setSoLuongTon(spct.getSoLuongTon() - request.getSoLuong());
//
//            if (spct.getSoLuongTon() == 0) {
//                spct.setTrangThai(ChiTietSanPhamStatus.HET_HANG);
//            }
//
//            chiTietSPRepo.save(spct);
//
//
//        }
//        for (KHHoaDonChiTietRequest x : hoaDonRequest.getListHDCT()) {
//            GioHangChiTiet gioHangChiTiet = khghctRepo.listGHCTByID(hoaDonRequest.getIdUser(), x.getIdCTSP());
//            if(gioHangChiTiet != null){
//                khghctRepo.deleteById(gioHangChiTiet.getId());
//            }
//
//        }
////        this.updateVoucher(kh.getId(), hoaDonRequest.getIdVoucher());
//        this.thongBaoService.thanhToan(saveHoaDon.getId());
//        sendMailOnline(hoaDon.getId());
//        return hoaDon;
//    }
}

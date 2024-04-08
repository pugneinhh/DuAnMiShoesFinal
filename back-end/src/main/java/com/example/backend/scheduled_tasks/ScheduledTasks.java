package com.example.backend.scheduled_tasks;

import com.example.backend.entity.HoaDon;
import com.example.backend.entity.NguoiDungVoucher;
import com.example.backend.entity.Voucher;
import com.example.backend.service.*;
import com.example.backend.util.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ScheduledTasks {
    @Autowired
    HoaDonServicee hoaDonServicee;
    @Autowired
    VoucherService voucherService;
    @Autowired
    KhuyenMaiService khuyenMaiService;
    @Autowired
    NguoiDungVoucherService nguoiDungVoucherService;
    @Autowired
    KhuyenMaiSanPhamService khuyenMaiSanPhamService;
    @Scheduled(cron = "0 0 3 * * *") // Lịch chạy vào 3 giờ sáng hàng ngày
    public void deleteBill3AM() {
        List<HoaDon> listHoaDon = hoaDonServicee.getAllBillToday();
        for (HoaDon x : listHoaDon){
            if (x.getTrangThai() == 0){
                hoaDonServicee.deleteHoaDon(x.getId());
            }
        }
    }


    @Scheduled(fixedRate = 1000) // Chạy mỗi giây 
    public void taskVoucher() {
        LocalDateTime now = LocalDateTime.now();
        List<Voucher> listVoucher = voucherService.getAll();
        for (Voucher x : listVoucher){
            if (x.getTrangThai() == Status.SAP_DIEN_RA && x.getNgayBatDau().isAfter(now)) {
                x.setTrangThai(Status.DANG_HOAT_DONG);
                List<NguoiDungVoucher> listNDV = nguoiDungVoucherService.getALL();
                for (NguoiDungVoucher v : listNDV){
                    if (v.getVoucher().getId().equals(x.getId())){
                        v.setTrangThai(Status.DANG_SU_DUNG);
                        nguoiDungVoucherService.update(v);
                    }
                }
                voucherService.update(x);
            }
            if (x.getTrangThai() == Status.DANG_HOAT_DONG && x.getNgayKetThuc().isAfter(now)){
                x.setTrangThai(Status.NGUNG_HOAT_DONG);
                List<NguoiDungVoucher> listNDV = nguoiDungVoucherService.getALL();
                for (NguoiDungVoucher v : listNDV){
                    if (v.getVoucher().getId().equals(x.getId())){
                        v.setTrangThai(Status.NGUNG_HOAT_DONG);
                        nguoiDungVoucherService.update(v);
                    }
                }
                voucherService.update(x);
            }
        }
    }
}

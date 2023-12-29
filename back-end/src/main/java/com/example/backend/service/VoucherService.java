package com.example.backend.service;

import com.example.backend.dto.request.VoucherRequest;
import com.example.backend.dto.response.AdminVoucher;
import com.example.backend.entity.Voucher;
import com.example.backend.dto.request.VoucherSearch;
import com.example.backend.repository.VoucherRepository;
import com.example.backend.util.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class VoucherService {
    @Autowired
    VoucherRepository vr;
    public List<Voucher> getAll(){
        Sort sort=Sort.by(Sort.Order.desc("ngayTao"));
//        return vr.findAll(sort);
        return vr.findAllByOrderByNgayTaoDesc();
    }
    public List<Voucher> getTim(String key, Date ngayBD,Date ngayKT){
        return vr.search(key,ngayBD,ngayKT);
    }
    public Voucher addVoucher(VoucherRequest request){
        Voucher v=request.map(new Voucher());
        return vr.save(v);
    }
    public Voucher updateTTNgung(String id,VoucherRequest request){
        Voucher v=request.map(new Voucher());
        v.setId(id);
        v.setTrangThai(Status.NGUNG_HOAT_DONG);
        return vr.save(v);
    }
    public Voucher updateTTHD(String id,VoucherRequest request){
        Voucher v=request.map(new Voucher());
        v.setId(id);
        v.setTrangThai(Status.DANG_HOAT_DONG);
        return vr.save(v);
    }
    public Voucher updateTTSap(String id,VoucherRequest request){
        Voucher v=request.map(new Voucher());
        v.setId(id);
        v.setTrangThai(Status.SAP_DIEN_RA);
        return vr.save(v);
    }
    public Voucher detailVoucher(String id){return vr.findById(id).get();}

    public List<AdminVoucher> getSearch(VoucherSearch voucherSearch) {
        return vr.searchVoucher(voucherSearch);
    }


//    @Scheduled(cron = "0 * * * * *",zone = "Asia/Saigon")
//    public void checkHan(){
//        Timestamp now = new Timestamp(System.currentTimeMillis());
//        for (Voucher x : vr.findAll()){
//            if (x.getNgayKetThuc().compareTo(now)<=0) {
//                x.setTrangThai(1);
//                vr.save(x);
//            }
//            if(x.getNgayKetThuc().compareTo(now)>0){
//                x.setTrangThai(0);
//                vr.save(x);
//            }
//            if(x.getLoaiVoucher()==null||x.getLoaiVoucher().equalsIgnoreCase("false")){
//                x.setSoLuong(0);
//                vr.save(x);
//            }
//        }
//    }

}

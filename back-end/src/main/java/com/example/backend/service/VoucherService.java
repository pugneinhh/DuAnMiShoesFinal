package com.example.duanmishoes.service;

import com.example.duanmishoes.model.AdminVoucher;
import com.example.duanmishoes.entity.Voucher;
import com.example.duanmishoes.model.VoucherSearch;
import com.example.duanmishoes.respon.VoucherRespon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

@Service
public class VoucherService {
    @Autowired
    VoucherRespon vr;
    public List<Voucher> getAll(){
        Sort sort=Sort.by(Sort.Order.desc("ngayTao"));
//        return vr.findAll(sort);
        return vr.findAllByOrderByNgayTaoDesc();
    }
    public List<Voucher> getTim(String key, Date ngayBD,Date ngayKT){
        return vr.search(key,ngayBD,ngayKT);
    }
    public Voucher addVoucher(Voucher v){
        return vr.save(v);
    }
    public Voucher detailVoucher(String id){return vr.getById(id);}

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

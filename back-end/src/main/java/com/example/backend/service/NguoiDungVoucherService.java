package com.example.backend.service;

import com.example.backend.entity.NguoiDung;
import com.example.backend.entity.NguoiDungVoucher;
import com.example.backend.entity.Voucher;
import com.example.backend.repository.NguoiDungRepository;
import com.example.backend.repository.NguoiDungVoucherRepository;
import com.example.backend.util.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NguoiDungVoucherService {
    @Autowired
    NguoiDungVoucherRepository nguoiDungVoucherRepository;
    @Autowired
    NguoiDungRepository nguoiDungRepository;
    public List<NguoiDungVoucher> getAllByVoucher(String voucher){
        return nguoiDungVoucherRepository.getAllByVoucherLike(voucher);
    }
    public List<NguoiDungVoucher> getAllByNguoiDung(String nguoiDung){
        return nguoiDungVoucherRepository.getAllByNguoiDungLike(nguoiDung);
    }
    public NguoiDungVoucher add(String idKH, Voucher v){
        NguoiDung nd=nguoiDungRepository.findById(idKH).get();
        NguoiDungVoucher ndv=new NguoiDungVoucher();
        ndv.setNguoiDung(nd);
        ndv.setVoucher(v);
        ndv.setNgayTao(LocalDateTime.now());
        ndv.setTrangThai(Status.DANG_SU_DUNG);
        return nguoiDungVoucherRepository.save(ndv);
    }
    public NguoiDungVoucher delete(String idKH, String idV){
        NguoiDungVoucher ndv=nguoiDungVoucherRepository.getNguoiDungVoucherByNguoiDung_IdAndVoucher_Id(idKH,idV);
        nguoiDungVoucherRepository.delete(ndv);
        return ndv;
    }

}

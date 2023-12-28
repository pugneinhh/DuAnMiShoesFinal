package com.example.backend.service;

import com.example.backend.dto.request.NguoiDungVoucherRequest;
import com.example.backend.entity.NguoiDungVoucher;
import com.example.backend.repository.NguoiDungVoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NguoiDungVoucherService {
    @Autowired
    NguoiDungVoucherRepository nguoiDungVoucherRepository;
    public List<NguoiDungVoucher> getAllByVoucher(String voucher){
        return nguoiDungVoucherRepository.getAllByVoucherLike(voucher);
    }
    public List<NguoiDungVoucher> getAllByNguoiDung(String nguoiDung){
        return nguoiDungVoucherRepository.getAllByNguoiDungLike(nguoiDung);
    }
    public NguoiDungVoucher add(NguoiDungVoucherRequest request){
        NguoiDungVoucher ndv=request.map(new NguoiDungVoucher());
        return nguoiDungVoucherRepository.save(ndv);
    }

}

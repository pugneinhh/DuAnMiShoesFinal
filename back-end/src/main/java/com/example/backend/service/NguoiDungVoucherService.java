package com.example.backend.service;

import com.example.backend.dto.request.KhachHangVoucherSearch;
import com.example.backend.dto.request.NguoiDungSeacrh;
import com.example.backend.dto.response.NguoiDungRespone;
import com.example.backend.dto.response.VoucherRespone;
import com.example.backend.entity.NguoiDung;
import com.example.backend.entity.NguoiDungVoucher;
import com.example.backend.entity.Voucher;
import com.example.backend.model.AdminKhachHangRepon;
import com.example.backend.repository.NguoiDungRepository;
import com.example.backend.repository.NguoiDungVoucherRepository;
import com.example.backend.repository.VoucherRepository;
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
    @Autowired
    VoucherRepository voucherRepository;
    public List<String> getAllByVoucher(String id){
        return nguoiDungVoucherRepository.getIDKHByIDKM(id);
    }
    public List<AdminKhachHangRepon> getNguoiDungByVoucher(String id){
        return nguoiDungVoucherRepository.getNguoiDungByVoucher(id);
    }
    public List<NguoiDungVoucher> getALL(){
        return nguoiDungVoucherRepository.findAll();
    }
    public List<VoucherRespone> getVoucherByNguoiDung(String id){
        return nguoiDungVoucherRepository.getVoucherByNguoiDung(id);
    }
    public List<NguoiDungVoucher> getAllByNguoiDung(String nguoiDung){
        return nguoiDungVoucherRepository.getAllByNguoiDungLike(nguoiDung);
    }
    public NguoiDungVoucher add(String idKH, Voucher v){
        NguoiDung nd=nguoiDungRepository.findById(idKH).get();
        System.out.println("Người dùng"+nd);
        System.out.println("Voucher"+v);
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

    public NguoiDungVoucher updateTrangThai_ChuaBatDau(String idKH, String idV){
        NguoiDungVoucher n = nguoiDungVoucherRepository.getNguoiDungVoucherByVoucherAndKHhachHang(idV,idKH);
        n.setTrangThai(Status.SAP_DIEN_RA);
        nguoiDungVoucherRepository.save(n);
        return n;
    }

    public NguoiDungVoucher updateTrangThai_DangDienRa(String idKH, String idV){
        NguoiDungVoucher n = nguoiDungVoucherRepository.getNguoiDungVoucherByVoucherAndKHhachHang(idV,idKH);
        n.setTrangThai(Status.DANG_SU_DUNG);
        nguoiDungVoucherRepository.save(n);
        return n;
    }

    public NguoiDungVoucher updateTrangThai_DaKetThuc(String idKH, String idV){
        NguoiDungVoucher n = nguoiDungVoucherRepository.getNguoiDungVoucherByVoucherAndKHhachHang(idV,idKH);
        System.out.println("N"+n.getId());
        n.setTrangThai(Status.NGUNG_HOAT_DONG);
        nguoiDungVoucherRepository.save(n);
        return n;
    }

    public List<AdminKhachHangRepon> getSearchKhachHang(KhachHangVoucherSearch nguoiDungSeacrh){
        return nguoiDungVoucherRepository.getKhachHangSearch(nguoiDungSeacrh);
    }

    public NguoiDungVoucher update(NguoiDungVoucher ndv){
        return nguoiDungVoucherRepository.save(ndv);
    }
}

package com.example.backend.repository;

import com.example.backend.entity.NguoiDungVoucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NguoiDungVoucherRepository extends JpaRepository<NguoiDungVoucher,String> {
    List<NguoiDungVoucher> getAllByVoucherLike(String voucher);
    List<NguoiDungVoucher> getAllByNguoiDungLike(String nguoiDung);
    NguoiDungVoucher getNguoiDungVoucherByNguoiDung_IdAndVoucher_Id(String idKH,String idV);
}

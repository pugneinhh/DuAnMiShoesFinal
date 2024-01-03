package com.example.backend.repository;

import com.example.backend.entity.NguoiDungVoucher;
import com.example.backend.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NguoiDungVoucherRepository extends JpaRepository<NguoiDungVoucher,String> {
    @Query(value = "select nguoi_dung_id from nguoidung_voucher where voucher_id=:?1",nativeQuery = true)
    List<String> getIDKHByIDKM(String id);
    List<NguoiDungVoucher> getAllByNguoiDungLike(String nguoiDung);
    NguoiDungVoucher getNguoiDungVoucherByNguoiDung_IdAndVoucher_Id(String idKH,String idV);
}

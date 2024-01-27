package com.example.backend.repository;

import com.example.backend.dto.response.NguoiDungRespone;
import com.example.backend.dto.response.VoucherRespone;
import com.example.backend.entity.NguoiDung;
import com.example.backend.entity.NguoiDungVoucher;
import com.example.backend.entity.Voucher;
import com.example.backend.model.AdminKhachHangRepon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NguoiDungVoucherRepository extends JpaRepository<NguoiDungVoucher,String> {
    @Query(value = "select nguoi_dung_id from nguoidung_voucher where voucher_id=:id and trang_thai ='DANG_SU_DUNG' " ,nativeQuery = true)
    List<String> getIDKHByIDKM(String id);

    @Query(value = """
select voucher.* from voucher join nguoidung_voucher on nguoidung_voucher.voucher_id =voucher.id\s
where nguoi_dung_id=:idND and voucher.trang_thai='DANG_HOAT_DONG' and nguoidung_voucher.trang_thai='DANG_SU_DUNG'\s
""",nativeQuery = true)
List<VoucherRespone> getVoucherByNguoiDung(String idND);
    @Query(value = "SELECT CASE WHEN nd.diem IS NULL THEN N'0'ELSE nd.diem END  as diem, nd.id AS idND, nd.ma AS maND, nd.ten AS tenND, nd.so_dien_thoai AS SDT,\n" +
            "  CASE WHEN nd.email IS NULL THEN N'Không có'ELSE nd.email END  as email,CASE WHEN nd.ngay_sinh IS NULL THEN N'Không có'ELSE nd.ngay_sinh END  as ngaySinh\n" +
            "  ,nd.gioi_tinh AS gioiTinh, nd.chung_minh_thu AS cccd, CASE WHEN nd.anh IS NULL THEN N'Không có'ELSE nd.anh END  as anh, \n" +
            "  nd.trang_thai AS trangThai\n" +
            "FROM nguoi_dung nd where nd.id in (select nguoi_dung_id from nguoidung_voucher where voucher_id=:idV )",nativeQuery = true)
    List<AdminKhachHangRepon> getNguoiDungByVoucher(@Param("idV") String id);
    List<NguoiDungVoucher> getAllByNguoiDungLike(String nguoiDung);

    NguoiDungVoucher getNguoiDungVoucherByNguoiDung_IdAndVoucher_Id(String idKH,String idV);

    @Query(value = "select * from nguoidung_voucher where voucher_id=:idV and nguoi_dung_id=:idND",nativeQuery = true)
    NguoiDungVoucher getNguoiDungVoucherByVoucherAndKHhachHang(String idV,String idND);
}

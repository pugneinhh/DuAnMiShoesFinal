package com.example.duanmishoes.respon;


import com.example.duanmishoes.model.AdminVoucher;
import com.example.duanmishoes.entity.Voucher;
import com.example.duanmishoes.model.VoucherSearch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.UUID;
@Repository
public interface VoucherRespon extends JpaRepository<Voucher,String> {
    List<Voucher> findAllByOrderByNgayTaoDesc();
    @Query(value ="SELECT * from voucher v WHERE v.ma LIKE %:key% or phuong_thuc LIKE :key and ngay_bat_dau between :ngayBD and :ngayKT and ngay_ket_thuc between  :ngayBD and :ngayKT" ,nativeQuery = true)
    List<Voucher> search(@Param("key")String key,@Param("ngayBD")Date ngayBD,@Param("ngayKT")Date ngayKT);

    @Query(value = """
    SELECT v.id AS id, v.ma AS ma,v.ten AS ten,v.phuong_thuc AS phuongThuc,v.muc_do AS mucDo,
                        v.giam_toi_da AS giamToiDa,v.dieu_kien AS dieuKien,v.so_luong AS soLuong,
                         v.loai_voucher AS loaiVoucher,v.ngay_bat_dau AS ngayBatDau,
                         v.ngay_ket_thuc AS ngayKetThuc,v.trang_thai AS trangThai FROM voucher v WHERE
             (:#{#voucherSearch.tenVoucher} IS NULL OR
             v.ma LIKE (%:#{#voucherSearch.tenVoucher}%) OR
             v.ten LIKE (%:#{#voucherSearch.tenVoucher}%) OR
             CAST(v.muc_do AS CHAR) LIKE (%:#{#voucherSearch.tenVoucher}%) ) AND
            (:#{#voucherSearch.phuongThucVoucher} IS NULL OR
             v.phuong_thuc LIKE (%:#{#voucherSearch.phuongThucVoucher}%)) AND
            (:#{#voucherSearch.loaiVoucher} IS NULL OR
            v.loai_voucher LIKE  (%:#{#voucherSearch.loaiVoucher}%)) AND
            ( :#{#voucherSearch.trangThaiVoucher} IS NULL OR
             v.trang_thai=:#{#voucherSearch.trangThaiVoucher}) AND
            ( :#{#voucherSearch.ngayBDVoucher} IS NULL OR
            :#{#voucherSearch.ngayKTVoucher} IS NULL OR
            (v.ngay_bat_dau BETWEEN (:#{#voucherSearch.ngayBDVoucher}) AND (:#{#voucherSearch.ngayKTVoucher}))
            AND (ngay_ket_thuc BETWEEN (:#{#voucherSearch.ngayBDVoucher}) AND (:#{#voucherSearch.ngayKTVoucher})))
""",nativeQuery = true)
    List<AdminVoucher> searchVoucher(VoucherSearch voucherSearch);
}

package com.example.backend.dto.request;

import com.example.backend.entity.Voucher;
import com.example.backend.util.Status;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VoucherRequest {
    private String id;
    private String ma;
    private String ten;
    private String loaiVoucher;
    private LocalDateTime ngayBatDau;
    private LocalDateTime ngayKetThuc;
    private int mucDo;
    private BigDecimal giamToiDa;
    private BigDecimal dieuKien;
    private int soLuong;
    private String nguoiTao;
    private String nguoiSua;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private Status trangThai;
    public Voucher map(Voucher v){
        v.setId(this.id);
        v.setMa(this.ma);
        v.setTen(this.ten);
        v.setLoaiVoucher(this.loaiVoucher);
        v.setMucDo(this.mucDo);
        v.setGiamToiDa(this.giamToiDa);
        v.setDieuKien(this.dieuKien);
        v.setNgayBatDau(this.ngayBatDau);
        v.setNgayKetThuc(this.ngayKetThuc);
        v.setNguoiTao(this.nguoiTao);
        v.setNguoiSua(this.nguoiSua);
        v.setNgaySua(this.ngaySua);
        v.setNgayTao(this.ngayTao);
        v.setTrangThai(this.trangThai);
        return v;
    }
}

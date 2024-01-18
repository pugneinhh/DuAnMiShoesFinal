package com.example.backend.dto.request;


import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.HoaDonChiTiet;
import com.example.backend.entity.IDHoaDonChiTiet;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class HoaDonChiTietRequest {
    private String hoaDon;
    private String chiTietSanPham;
    private int soLuong;
    private BigDecimal giaSauGiam;
    private BigDecimal giaGiam;
    private String nguoiTao;
    private String nguoiSua;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private int trangThai;
    public HoaDonChiTiet map(HoaDonChiTiet hdct){
        IDHoaDonChiTiet id=new IDHoaDonChiTiet();
        id.setHoaDon(HoaDon.builder().id(this.hoaDon).build());
        id.setChiTietSanPham(ChiTietSanPham.builder().id(this.chiTietSanPham).build());
        hdct.setId(id);
        hdct.setSoLuong(this.soLuong);
        hdct.setGiaGiam(this.giaGiam);
        hdct.setGiaSauGiam(this.giaSauGiam);
        hdct.setNguoiTao(this.nguoiTao);
        hdct.setNguoiSua(this.nguoiSua);
        hdct.setNgayTao(this.ngayTao);
        hdct.setNgaySua(this.ngaySua);
        hdct.setTrangThai(this.trangThai);
        return hdct;
    }
}

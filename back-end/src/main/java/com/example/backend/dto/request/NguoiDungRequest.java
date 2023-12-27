package com.example.backend.dto.request;

import com.example.backend.entity.DiaChi;
import com.example.backend.entity.NguoiDung;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NguoiDungRequest {
    private String id;
    private String ma;
    private String ten;
    private Date ngaySinh;
    private String soDienThoai;
    private LocalDateTime ngayThamGia;
    private String chungMinhThu;
    private boolean gioiTinh;
    private String anh;
    private String email;
    private String matKhau;
    private String nguoiTao;
    private String nguoiSua;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private String chucVu;
    private String hangKhachHang;
    private int diem;
    private int trangThai;
    private String diaChi;
    public NguoiDung map(NguoiDung nguoiDung){
        nguoiDung.setId(this.id);
        nguoiDung.setMa(this.ma);
        nguoiDung.setTen(this.ten);
        nguoiDung.setNgaySinh(this.ngaySinh);
        nguoiDung.setSoDienThoai(this.soDienThoai);
        nguoiDung.setNgayThamGia(this.ngayThamGia);
        nguoiDung.setChungMinhThu(this.chungMinhThu);
        nguoiDung.setGioiTinh(this.gioiTinh);
        nguoiDung.setAnh(this.anh);
        nguoiDung.setEmail(this.email);
        nguoiDung.setMatKhau(this.matKhau);
        nguoiDung.setChucVu(this.chucVu);
        nguoiDung.setHangKhachHang(this.hangKhachHang);
        nguoiDung.setDiem(this.diem);
        nguoiDung.setTrangThai(this.trangThai);
        if(this.diaChi==null) {
            nguoiDung.setDiaChi(null);
        }else{
            nguoiDung.setDiaChi(DiaChi.builder().id(this.diaChi).build());
        }
        nguoiDung.setNguoiTao(this.nguoiTao);
        nguoiDung.setNguoiSua(this.nguoiSua);
        nguoiDung.setNgayTao(this.ngayTao);
        nguoiDung.setNgaySua(this.ngaySua);
        return nguoiDung;
    }
}

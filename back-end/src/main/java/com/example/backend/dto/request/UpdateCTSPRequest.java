package com.example.backend.dto.request;

import com.example.backend.entity.*;

import java.math.BigDecimal;

public class UpdateCTSPRequest {

    public String idSP;
    public int trangThai;
    public int soLuong;
    public String moTa;
    public BigDecimal giaBan;
    public String idDM;
    public String idDC;
    public String idH;
    public String idKT;
    public String idMS;
    public String idCL;

    public ChiTietSanPham map(ChiTietSanPham ct){
        ct.setTrangThai(this.trangThai);
        ct.setSoLuong(this.soLuong);
        ct.setMoTa(this.moTa);
        ct.setGiaBan(this.giaBan);
        ct.setDanhMuc(DanhMuc.builder().id(this.idDM).build());
        ct.setDeGiay(DeGiay.builder().id(this.idDC).build());
        ct.setHang(Hang.builder().id(this.idH).build());
        ct.setKichThuoc(KichThuoc.builder().id(this.idKT).build());
        ct.setMauSac(MauSac.builder().id(this.idMS).build());
        ct.setChatLieu(ChatLieu.builder().id(this.idCL).build());
        return ct;
    }
}

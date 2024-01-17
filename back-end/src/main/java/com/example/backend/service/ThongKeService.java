package com.example.backend.service;


import com.example.backend.dto.response.BieuDoRespon;
import com.example.backend.dto.response.SanPhamBanChayRespon;
import com.example.backend.dto.response.ThongKeRespon;
import com.example.backend.dto.response.TrangThaiHoaDonRespon;
import com.example.backend.repository.ThongKeResponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class ThongKeService {
    @Autowired
    ThongKeResponsitory thongKeResponsitory;
    public  ThongKeRespon thongKeTheoNgay(){
        return thongKeResponsitory.thongKeTheoNgay();
    }
    public  ThongKeRespon thongKeTheoThang(){
        return thongKeResponsitory.thongKeTheoThang();
    }
    public  ThongKeRespon thongKeTheoNam(){
        return thongKeResponsitory.thongKeTheoNam();
    }
    public List<SanPhamBanChayRespon> getSpBanChay(){return thongKeResponsitory.getSPBanChay();}
    public BieuDoRespon getBieuDoNgay(Date ngay){
        return thongKeResponsitory.getBieuDoNgay(ngay);
    }
    public  BieuDoRespon getBieuDoTuan(Date ngay){
        return thongKeResponsitory.getBieuDoTuan(ngay);
    }
    public  BieuDoRespon getBieuDoThang(Date ngay){
        return thongKeResponsitory.getBieuDoThang(ngay);
    }
    public List<TrangThaiHoaDonRespon> getTrangThaiHoaDon(){
        return thongKeResponsitory.getTrangThaiHoaDon();
    }

}

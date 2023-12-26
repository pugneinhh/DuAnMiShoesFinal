package com.example.duanmishoes.service;

import com.example.duanmishoes.model.AdminBanHangHDRespon;
import com.example.duanmishoes.respon.HoaDonResponn;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BanHangService {
    @Autowired
    HoaDonResponn hoaDonResponn;

    public List<AdminBanHangHDRespon> HoaDonBanHang(){
        return  hoaDonResponn.HoaDonBanHang();
    }
}

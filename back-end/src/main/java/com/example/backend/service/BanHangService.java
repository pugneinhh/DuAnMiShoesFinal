package com.example.backend.service;

import com.example.backend.model.AdminBanHangHDRespon;
import com.example.backend.respon.HoaDonResponn;
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

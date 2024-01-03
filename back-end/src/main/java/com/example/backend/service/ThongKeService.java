package com.example.backend.service;


import com.example.backend.dto.response.ThongKeRespon;
import com.example.backend.repository.ThongKeResponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;

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
}

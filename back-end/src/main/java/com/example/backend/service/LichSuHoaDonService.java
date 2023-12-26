package com.example.backend.service;
import com.example.backend.entity.LichSuHoaDon;
import com.example.backend.model.*;
import com.example.backend.respon.LichSuHoaDonRespon;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LichSuHoaDonService {
    @Autowired
    LichSuHoaDonRespon lichSuHoaDonRespon;
    public LichSuHoaDon addLichSuHoaDon(LichSuHoaDon lichSuHoaDon){
        return lichSuHoaDonRespon.save(lichSuHoaDon);

    }
    public List<AdminHoaDonTimeLineRespon> getLichHoaDon(UUID idHD) {
        return lichSuHoaDonRespon.detailLichSuHoaDon(idHD);
    }
    public List<AdminHoaDonTimeLineRes> HoaDonTimeLine(UUID idHD){
        return lichSuHoaDonRespon.HoaDonTimeLine(idHD);
    }
}

package com.example.backend.service;

import com.example.backend.dto.request.HoaDonRequest;
import com.example.backend.dto.response.sanpham.ChiTietSanPhamRespone;
import com.example.backend.entity.HoaDon;
import com.example.backend.repository.CTSPRepository;
import com.example.backend.repository.HoaDonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BanHangService {
    @Autowired
    HoaDonRepository hoaDonRepository;
    @Autowired
    CTSPRepository ctspRepository;


   public List<ChiTietSanPhamRespone> getALLCTSPBanHang(){
        return ctspRepository.getALLCTSPBanHang();
    }

    public HoaDon addHoaDon(HoaDonRequest hoaDonRequest){
       HoaDon hd =hoaDonRequest.map(new HoaDon());
       return hoaDonRepository.save(hd);
    }

}

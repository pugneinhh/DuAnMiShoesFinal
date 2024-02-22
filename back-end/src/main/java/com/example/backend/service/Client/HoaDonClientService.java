package com.example.backend.service.Client;

import com.example.backend.dto.request.HoaDonCLient.TrangThaiRequest;
import com.example.backend.dto.response.HoaDonCLient.HoaDonClientHistory;
import com.example.backend.model.AdminHoaDonSanPham;
import com.example.backend.repository.HoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoaDonClientService {
    @Autowired
    HoaDonRepository hoaDonRepository;
    public List<HoaDonClientHistory> getALLHDClientByIDKH(TrangThaiRequest req){
        return hoaDonRepository.getALLHDClientByIDKH( req);
    }
    public List<AdminHoaDonSanPham> detailHDSanPham(String key){
        return  hoaDonRepository.detailHDSanPham(key);
    }
}

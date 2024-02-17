package com.example.backend.service;

import com.example.backend.dto.request.GioHangChiTietRequest;
import com.example.backend.dto.response.GioHangChiTietRespone;
import com.example.backend.entity.GioHangChiTiet;
import com.example.backend.repository.GioHangChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GioHangChiTietService {
    @Autowired
    GioHangChiTietRepository gioHangChiTietRepository;
    @Autowired
    GioHangService gioHangService;
    public List<GioHangChiTietRespone> getAllGHCT(String idGH){
        return gioHangChiTietRepository.getAllGioHangChiTiet(idGH);
    }
    public GioHangChiTiet addGHCT(GioHangChiTietRequest request){
        GioHangChiTiet ghct=request.map(new GioHangChiTiet());
        return gioHangChiTietRepository.save(ghct);
    }
}

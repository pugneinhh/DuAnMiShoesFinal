package com.example.backend.service;

import com.example.backend.dto.request.ThanhToanRequest;
import com.example.backend.dto.response.LichSuThanhToanRespon;
import com.example.backend.entity.ThanhToan;
import com.example.backend.repository.ThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThanhToanService {
    @Autowired
    ThanhToanRepository thanhToanRepository;
    public ThanhToan thanhToan(ThanhToanRequest request){
        ThanhToan tt=request.map(new ThanhToan());
        return thanhToanRepository.save(tt);
    }
    public List<LichSuThanhToanRespon> getALLLLichSuThanhToanByIDHD(String id){
        return thanhToanRepository.getALLLLichSuThanhToanByIDHD(id);
    }

//    public ThanhToan thanhToanTienMat(ThanhToanRequest request){
//        ThanhToan tt = request.map(new ThanhToan())
//    }
}

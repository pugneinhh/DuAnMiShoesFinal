package com.example.backend.service;

import com.example.backend.dto.request.ThanhToanRequest;
import com.example.backend.entity.ThanhToan;
import com.example.backend.repository.ThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ThanhToanService {
    @Autowired
    ThanhToanRepository thanhToanRepository;
    public ThanhToan thanhToan(ThanhToanRequest request){
        ThanhToan tt=request.map(new ThanhToan());
        return thanhToanRepository.save(tt);
    }
}
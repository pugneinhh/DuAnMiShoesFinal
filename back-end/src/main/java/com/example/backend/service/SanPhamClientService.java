package com.example.backend.service;


import com.example.backend.dto.response.SanPhamClient.DetailCTSPClientRespon;
import com.example.backend.repository.CTSPRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SanPhamClientService {
    @Autowired
    CTSPRepository ctspRepository;
    public DetailCTSPClientRespon detailCTSPClient(String id){return ctspRepository.detailCTSPClient(id);}
}

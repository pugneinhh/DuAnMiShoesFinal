package com.example.backend.service;

import com.example.backend.dto.response.sanpham.ChiTietSanPhamRespone;
import com.example.backend.repository.CTSPRepository;
import com.example.backend.repository.KhuyenMaiRepository;
import com.example.backend.repository.KhuyenMaiSanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhuyenMaiSanPhamService {
    @Autowired
    KhuyenMaiSanPhamRepository khuyenMaiSanPhamRepository;
    @Autowired
    KhuyenMaiRepository khuyenMaiRepository;
    @Autowired
    CTSPRepository chiTietSanPhamRespone;

    public List<String> getAllPromotionsByProduct (String id){
        return  khuyenMaiSanPhamRepository.getAllProductByPromotion(id);
    }
}

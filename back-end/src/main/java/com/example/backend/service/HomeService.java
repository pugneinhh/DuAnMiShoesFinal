package com.example.backend.service;

import com.example.backend.dto.response.sanpham.HomeRespone;
import com.example.backend.repository.HomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeService {
    @Autowired
    HomeRepository homeRepository;

    public List<HomeRespone> getAllSanPham(){
        return homeRepository.getALLSanPham();
    }
    public List<HomeRespone> getNewSanPham(){
        return homeRepository.getALLSanPhamNew();
    }
    public List<HomeRespone> getHotSale(){
        return homeRepository.getHotSale();
    }
}

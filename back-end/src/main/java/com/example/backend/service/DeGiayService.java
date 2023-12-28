package com.example.backend.service;
import com.example.backend.dto.request.DeGiayRequest;
import com.example.backend.dto.response.DeGiayRespone;
import com.example.backend.entity.DeGiay;
import com.example.backend.repository.DeGiayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeGiayService {
    @Autowired
    private DeGiayRepository deGiayRepository;
    public List<DeGiay> getALL(){
        return deGiayRepository.findAll();
    }
    public List<DeGiayRespone> getALLDC(){
        return deGiayRepository.getALLDC();
    }
    public String addDC(DeGiayRequest dg){
        DeGiay deGiay = DeGiay.builder()
                .ma(dg.getMa())
                .ten(dg.getTen())
                .ngayTao(dg.getNgayTao())
                .trangThai(1)
                .build();
        deGiayRepository.save(deGiay);
        return "Done";
    }
}

package com.example.backend.service;
import com.example.backend.dto.request.HangRequest;
import com.example.backend.dto.response.HangRespone;
import com.example.backend.entity.Hang;
import com.example.backend.repository.HangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HangService {
    @Autowired
    HangRepository hangRepository;
    public List<Hang> getALL(){
        return hangRepository.findAll();
    }
    public List<HangRespone> getALLH(){
        return hangRepository.getALLH();
    }
    public String addH(HangRequest h){
        Hang hang = Hang.builder()
                .ma(h.getMa())
                .ten(h.getTen())
                .ngayTao(h.getNgayTao())
                .trangThai(0)
                .build();
        hangRepository.save(hang);
        return "Done";
    }
}

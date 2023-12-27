package com.example.backend.service;
import com.example.backend.entity.Hang;
import com.example.backend.model.AdminHangRespon;
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
    public List<AdminHangRespon> getALLH(){
        return hangRepository.getALLH();
    }
    public Hang addH(Hang h){return hangRepository.save(h);}
}

package com.example.backend.service;

import com.example.backend.dto.request.NguoiDungRequest;

import com.example.backend.entity.NguoiDung;
import com.example.backend.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NguoiDungService {
    @Autowired
    NguoiDungRepository nguoiDungRepository;
    public List<NguoiDung> getAll(){
        return nguoiDungRepository.findAll();
    }
    public NguoiDung add(NguoiDungRequest request){
        NguoiDung nd=request.map(new NguoiDung());
        return nguoiDungRepository.save(nd);
    }
}

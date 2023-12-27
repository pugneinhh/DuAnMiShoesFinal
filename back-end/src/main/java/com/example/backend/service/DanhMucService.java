package com.example.backend.service;
import com.example.backend.entity.DanhMuc;
import com.example.backend.model.AdminDanhMucRespon;
import com.example.backend.repository.DanhMucRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DanhMucService {
    @Autowired
    DanhMucRepository danhMucRepository;

    public List<DanhMuc> getALL() {
        return danhMucRepository.findAll();
    }

    public List<AdminDanhMucRespon> getALLDM() {
        return danhMucRepository.getALLDM();
    }

    public List<AdminDanhMucRespon> getTim(String key, int tt) {
        return danhMucRepository.timDM(key, tt);
    }

    public DanhMuc addDM(DanhMuc dm) {
        return danhMucRepository.save(dm);
    }
}

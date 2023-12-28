package com.example.backend.service;
import com.example.backend.dto.request.DanhMucRequest;
import com.example.backend.dto.response.DanhMucRespone;
import com.example.backend.entity.DanhMuc;
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

    public List<DanhMucRespone> getALLDM() {
        return danhMucRepository.getALLDM();
    }

    public List<DanhMucRespone> getTim(String key, int tt) {
        return danhMucRepository.timDM(key, tt);
    }

    public String addDM(DanhMucRequest dm) {
        DanhMuc danhMuc = DanhMuc.builder()
                .ma(dm.getMa())
                .ten(dm.getTen())
                .ngayTao(dm.getNgayTao())
                .trangThai(1)
                .build();
        danhMucRepository.save(danhMuc);
        return "Done";
    }
}

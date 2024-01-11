package com.example.backend.service;
import com.example.backend.dto.request.DanhMucRequest;
import com.example.backend.dto.request.sanphamsearch.SanPhamSearch;
import com.example.backend.dto.request.sanphamupdate.UpdateCTSPRequest;
import com.example.backend.dto.request.sanphamupdate.UpdateDanhMucRequest;
import com.example.backend.dto.response.DanhMucRespone;
import com.example.backend.dto.response.MauSacRespone;
import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.entity.DanhMuc;
import com.example.backend.entity.MauSac;
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

    public DanhMuc update(String id, UpdateDanhMucRequest updateDanhMucRequest) {
        DanhMuc dm = updateDanhMucRequest.map(new DanhMuc());
        dm.setId(id);
        return danhMucRepository.save(dm);
    }

    public DanhMuc detailDM(String id){return danhMucRepository.findById(id).get();}

    public List<DanhMucRespone> getTim(SanPhamSearch sanPhamSearch) {
        return danhMucRepository.tim(sanPhamSearch);
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

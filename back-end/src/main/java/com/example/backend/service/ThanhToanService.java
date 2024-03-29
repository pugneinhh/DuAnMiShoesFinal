package com.example.backend.service;

import com.example.backend.dto.request.ThanhToanRequest;
import com.example.backend.dto.response.LichSuThanhToanRespon;
import com.example.backend.entity.ThanhToan;
import com.example.backend.repository.ThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThanhToanService {
    @Autowired
    ThanhToanRepository thanhToanRepository;

    public ThanhToan thanhToan(ThanhToanRequest request) {
        ThanhToan tt = request.map(new ThanhToan());
//        List<ThanhToan> listTT = thanhToanRepository.getThanhToanByIdHD(tt.getHoaDon().getId());
//
//        if (listTT!= null && listTT.size() > 0) {
//            for (ThanhToan t : listTT) {
//                System.out.println("T"+t.toString());
//                if (t.getPhuongThuc() == 0 && t.getTrangThai() != 1 && t.getPhuongThuc() ==tt.getPhuongThuc()){
//                    t.setTienMat(t.getTienMat().add(tt.getTienMat()));
//                    t.setTongTien(t.getTongTien().add(tt.getTienMat()));
//                    return thanhToanRepository.save(t);
//                } else if (t.getPhuongThuc() == 1 && t.getTrangThai() != 1 && t.getPhuongThuc() == tt.getPhuongThuc()) {
//                    t.setTongTien(t.getTongTien().add(tt.getTongTien()));
//                    return thanhToanRepository.save(t);
//                }
//            }
//        }
        return thanhToanRepository.save(tt);
    }

    public List<LichSuThanhToanRespon> getALLLLichSuThanhToanByIDHD(String id) {
        return thanhToanRepository.getALLLLichSuThanhToanByIDHD(id);
    }

    //    public ThanhToan thanhToanTienMat(ThanhToanRequest request){
//        ThanhToan tt = request.map(new ThanhToan())
//    }
    public List<ThanhToan> getThanhToanByIdHD(String idHD) {
        return thanhToanRepository.getThanhToanByIdHD(idHD);
    }

    public ThanhToan save(ThanhToan tt){
        return thanhToanRepository.save(tt);
    }
}

package com.example.backend.service;

import com.example.backend.dto.request.HoaDonChiTietRequest;
import com.example.backend.dto.response.HoaDonChiTietRespone;
import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.entity.HoaDonChiTiet;
import com.example.backend.entity.IDHoaDonChiTiet;
import com.example.backend.repository.CTSPRepository;
import com.example.backend.repository.HoaDonChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class HoaDonChiTietService {
    @Autowired
    HoaDonChiTietRepository hoaDonChiTietRepository;
    @Autowired
    CTSPRepository ctspRepository;
    public List<HoaDonChiTietRespone> getAllHDCTByHD(String id){
        return hoaDonChiTietRepository.getAllHDCTByHD(id);
    }
    public HoaDonChiTietRespone getOneHDCT(String idHD,String idCTSP){
        return hoaDonChiTietRepository.getOneHDCT(idHD,idCTSP);
    }
    public HoaDonChiTiet addHDCT(HoaDonChiTietRequest request){
        HoaDonChiTiet hdct=request.map(new HoaDonChiTiet());
        String idCTSP= request.getChiTietSanPham();
        ChiTietSanPham ctsp=ctspRepository.findById(idCTSP).get();
        Optional<HoaDonChiTiet> timhdct=hoaDonChiTietRepository.findHoaDonChiTietById_HoaDon_Id(request.getHoaDon()).stream().filter(hd -> hd.getChiTietSanPham().getId().equals(idCTSP)).findFirst();
        if(timhdct.isPresent()){
            HoaDonChiTiet hdctTonTai=timhdct.get();
            hdctTonTai.setSoLuong(hdct.getSoLuong()+request.getSoLuong());
            hdct.setNgaySua(LocalDateTime.now());
            ctsp.setSoLuong(ctsp.getSoLuong()- request.getSoLuong());
            ctspRepository.save(ctsp);
            return hoaDonChiTietRepository.save(hdctTonTai);
        }
        hdct.setNgayTao(LocalDateTime.now());
        hdct.setTrangThai(0);
        ctsp.setSoLuong(ctsp.getSoLuong()- request.getSoLuong());
        ctspRepository.save(ctsp);
        return  hoaDonChiTietRepository.save(hdct);
    }
    public HoaDonChiTiet updateTruSl(HoaDonChiTietRequest request){
        HoaDonChiTiet hdct=request.map(new HoaDonChiTiet());
        String idCTSP= request.getChiTietSanPham();
        ChiTietSanPham ctsp=ctspRepository.findById(idCTSP).get();
        ctsp.setSoLuong(ctsp.getSoLuong()+ request.getSoLuong());
        ctspRepository.save(ctsp);
        hdct.setNgaySua(LocalDateTime.now());
        hdct.setTrangThai(2);
        return  hoaDonChiTietRepository.save(hdct);
    }
}

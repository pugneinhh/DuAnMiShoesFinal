package com.example.backend.service;

import com.example.backend.dto.request.HoaDonChiTietRequest;
import com.example.backend.dto.response.HoaDonChiTietBanHangRespone;
import com.example.backend.dto.response.HoaDonChiTietRespone;
import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.entity.HoaDonChiTiet;
import com.example.backend.repository.CTSPRepository;
import com.example.backend.repository.HoaDonChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class HoaDonChiTietService {
    @Autowired
    HoaDonChiTietRepository hoaDonChiTietRepository;
    @Autowired
    CTSPRepository ctspRepository;
    public List<HoaDonChiTietBanHangRespone> getAllHDCTByHD(String id){
        return hoaDonChiTietRepository.getAllHDCTByHD(id);
    }
    public HoaDonChiTietRespone getOneHDCT(String idHD,String idCTSP){
        return hoaDonChiTietRepository.getOneHDCT(idHD,idCTSP);
    }
    public HoaDonChiTiet addHDCT(HoaDonChiTietRequest request){
        HoaDonChiTiet hdct=request.map(new HoaDonChiTiet());
        String idCTSP= request.getChiTietSanPham();
        ChiTietSanPham ctsp=ctspRepository.findById(idCTSP).get();
        Optional<HoaDonChiTiet> timhdct=hoaDonChiTietRepository.findHoaDonChiTietByHoaDon_Id(request.getHoaDon()).stream().filter(hd -> hd.getChiTietSanPham().getId().equals(idCTSP)).findFirst();
        if(timhdct.isPresent()){
            HoaDonChiTiet hdctTonTai=timhdct.get();
            hdctTonTai.setSoLuong(hdctTonTai.getSoLuong()+(request.getSoLuong()-hdctTonTai.getSoLuong()));
            hdctTonTai.setNgaySua(LocalDateTime.now());
            ctsp.setSoLuong(ctsp.getSoLuong()- (request.getSoLuong()-hdctTonTai.getSoLuong()));
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
        HoaDonChiTiet hdctTonTai=hoaDonChiTietRepository.findById(request.getId()).get();
        hdctTonTai.setSoLuong(hdctTonTai.getSoLuong()-(hdct.getSoLuong()- hdctTonTai.getSoLuong()));
        String idCTSP= request.getChiTietSanPham();
        ChiTietSanPham ctsp=ctspRepository.findById(idCTSP).get();
        ctsp.setSoLuong(ctsp.getSoLuong()+ (hdct.getSoLuong()- hdctTonTai.getSoLuong()));
        ctspRepository.save(ctsp);
        hdctTonTai.setNgaySua(LocalDateTime.now());

        return  hoaDonChiTietRepository.save(hdctTonTai);
    }
    public HoaDonChiTiet deleteHDCT(HoaDonChiTietRequest request){
        HoaDonChiTiet hdctTonTai=hoaDonChiTietRepository.findById(request.getId()).get();
        ChiTietSanPham ctsp=ctspRepository.findById(request.getId()).get();
        ctsp.setSoLuong(ctsp.getSoLuong()+request.getSoLuong());
        hdctTonTai.setNgaySua(LocalDateTime.now());
        hdctTonTai.setTrangThai(2);
        return  hoaDonChiTietRepository.save(hdctTonTai);
    }

    public void deleteHDCTAndRollBackInSell(String idCTSP,String idHD){
        HoaDonChiTiet hdct = hoaDonChiTietRepository.getHDCTByCTSPAndHD(idCTSP,idHD);
        ChiTietSanPham ctsp = ctspRepository.getReferenceById(idCTSP);
        int slt = ctsp.getSoLuong();
        int slh = hdct.getSoLuong();
        ctsp.setSoLuong(slt+slh);
        ctspRepository.save(ctsp);
        hoaDonChiTietRepository.delete(hdct);
    }

    public void updateGia(String idCTSP, BigDecimal giaGiam , BigDecimal giaSauGiam){
        List<HoaDonChiTiet> list = hoaDonChiTietRepository.getAllHDCTByCTSP(idCTSP);
        for (HoaDonChiTiet h : list){
            System.out.println("H"+h);
            h.setGiaGiam(giaGiam);
            h.setGiaSauGiam(giaSauGiam);
            hoaDonChiTietRepository.save(h);
            System.out.println( hoaDonChiTietRepository.save(h));
        }
    }

    public HoaDonChiTiet updateSL(String idCTSP,String idHD,int soLuongCapNhat){
        HoaDonChiTiet hdct = hoaDonChiTietRepository.getHDCTByCTSPAndHD(idCTSP,idHD);
        ChiTietSanPham ctsp = ctspRepository.getReferenceById(idCTSP);
        int slt = ctsp.getSoLuong();
        int slh = hdct.getSoLuong();
        int sltd = soLuongCapNhat-slh;
        hdct.setSoLuong(soLuongCapNhat);
        ctsp.setSoLuong(slt-sltd);
        System.out.println("HDCT sau update"+hdct);
        System.out.println("CTSP sau update"+ctsp);
        ctspRepository.save(ctsp);
       return hoaDonChiTietRepository.save(hdct);
    }

}

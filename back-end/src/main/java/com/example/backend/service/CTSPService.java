package com.example.backend.service;
import com.example.backend.dto.request.sanphamsearch.CTSPSearch;
import com.example.backend.dto.request.sanpham.ChiTietSanPhamRequest;
import com.example.backend.dto.request.sanphamupdate.UpdateCTSPRequest;
import com.example.backend.dto.response.ChiTietSanPhamForBanHang;
import com.example.backend.dto.response.SoLuongVaSoLuongTon;
import com.example.backend.dto.response.sanpham.CTSPSearchRespone;
import com.example.backend.dto.response.sanpham.ChiTietSanPhamRespone;
import com.example.backend.dto.response.sanpham.DetailCTSPRespone;
import com.example.backend.dto.response.sanpham.DetailCtspByQrRespon;
import com.example.backend.entity.*;
import com.example.backend.model.*;
import com.example.backend.repository.CTSPRepository;
import com.example.backend.repository.GioHangChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CTSPService {
    @Autowired
    CTSPRepository ctspRepository;
    @Autowired
    KhuyenMaiService khuyenMaiService;
    @Autowired
    ThongBaoService thongBaoService;
    @Autowired
    HoaDonServicee hoaDonServicee;
    @Autowired
    KhuyenMaiSanPhamService khuyenMaiSanPhamService;
    @Autowired
    GioHangChiTietRepository gioHangChiTietRepository;
    public List<ChiTietSanPham> getALL(){
        return ctspRepository.findAll();
    }
    public List<ChiTietSanPhamRespone> getALLCTSP(String id){
        return ctspRepository.getALLCTSP(id);
    }
    public DetailCTSPRespone detailCTSP(String id){return ctspRepository.detailCTSP(id);}

    public DetailCtspByQrRespon detailCtspByQrRespon(String id){return ctspRepository.QRctsp(id);}
    public DetailCTSPRespone detailCTSPGioHang(String id){return ctspRepository.detailCTSPGioHang(id);}

    public List<DetailCTSPRespone> detail(){return ctspRepository.detail();}

    public ChiTietSanPham update(String id, UpdateCTSPRequest request) {
        ChiTietSanPham ctBanDau= ctspRepository.findById(id).get();
        ChiTietSanPham ct = request.map(new ChiTietSanPham());
        ct.setId(id);
        ct.setKhuyenMai(ctBanDau.getKhuyenMai());
        ct.setNgayTao(ctBanDau.getNgayTao());
        ct.setGiaNhap(ctBanDau.getGiaNhap());
        List<GioHangChiTiet> listGH=gioHangChiTietRepository.getAllGHCTByCTSP(id);
        for (GioHangChiTiet gh:listGH) {
            if(gh.getSoLuong()>ct.getSoLuong()){
                gh.setSoLuong(ct.getSoLuong());
                gh.setThanhTien(ct.getGiaBan().multiply(BigDecimal.valueOf(ct.getSoLuong())));
                gioHangChiTietRepository.save(gh);
                if(ct.getSoLuong()==0){
                    gioHangChiTietRepository.delete(gh);
                }
            }else{
                gh.setThanhTien(ct.getGiaBan().multiply(BigDecimal.valueOf(gh.getSoLuong())));
            }
           gioHangChiTietRepository.save(gh);
        }
        return ctspRepository.save(ct);
    }

    public ChiTietSanPham updateNhanh(String id, UpdateCTSPRequest request) {
        ChiTietSanPham ct = request.map(new ChiTietSanPham());
        ct.setId(id);
        return ctspRepository.save(ct);
    }

    public List<CTSPSearchRespone> getSearch(String idSP, CTSPSearch ctspSearch){
        return ctspRepository.getTim(idSP,ctspSearch);
    }

    public List<ChiTietSanPhamForBanHang> getSearchBanHang(CTSPSearch ctspSearch){
        return ctspRepository.getTimBanHang(ctspSearch);
    }


    public ChiTietSanPham add (ChiTietSanPhamRequest sp){
        thongBaoService.socketLoadSanPham(sp.getId());
        ChiTietSanPham ct = sp.map(new ChiTietSanPham());

        return ctspRepository.save(ct);
    }

    public List<String> getALLCTSPByKM(String id){
        return ctspRepository.getAllCTSPByKM(id);
    }


    public ChiTietSanPham updateKM(String idCTSP , KhuyenMai km){
        LocalDateTime now = LocalDateTime.now();
        ChiTietSanPham ctsp = ctspRepository.getReferenceById(idCTSP);
        if (km.getNgay_bat_dau().isAfter(now)) {
            System.out.println(">>>>>>>>>>>>>>>>>>>>>>>Vào update khuyến mại");
            ctsp.setKhuyenMai(km);
            ctsp.setNgaySua(LocalDateTime.now());
        }
        return ctspRepository.save(ctsp);
    }

    public List<AdminCTSPForKhuyenMai> getAllCTSPByIDSP(String idSP){
        return ctspRepository.getCTSPBySP(idSP);
    }

    public List<String> getCTSPByKM(String idKM){
        return  ctspRepository.getCTSPByKM(idKM);
    }

    public ChiTietSanPham deleteKM(String idCTSP,String idKM){
        ChiTietSanPham ctsp = ctspRepository.getReferenceById(idCTSP);
        KhuyenMaiSanPham kmsp = khuyenMaiSanPhamService.find(idKM,idCTSP);
        if (kmsp != null) khuyenMaiSanPhamService.delete(kmsp);
        if (ctsp.getKhuyenMai() != null && ctsp.getKhuyenMai().getId().equals(idKM)) {
//        if  (ctsp.getKhuyenMai()!= null && km.getId().equalsIgnoreCase(ctsp.getKhuyenMai().getId())) {
            System.out.println("CTSP" + ctsp);
            ctsp.setKhuyenMai(null);
            ctsp.setNgaySua(LocalDateTime.now());
        }
      //  }
        return ctspRepository.save(ctsp);
    }

    public ChiTietSanPham findChiTietSanPhamByID(String idCTSP){
        return ctspRepository.findById(idCTSP).get();
    }

    public SoLuongVaSoLuongTon getSLVaSLT(String idSP,String ma){
        HoaDon hd = hoaDonServicee.findHoaDonByMa(ma);
        return ctspRepository.getSLAndSLT(idSP,hd.getId());
    }

    public ChiTietSanPham updateCTSP(ChiTietSanPham ctsp){
        return ctspRepository.save(ctsp);
    }
}

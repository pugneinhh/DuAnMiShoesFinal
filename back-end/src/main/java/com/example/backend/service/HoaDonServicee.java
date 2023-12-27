package com.example.backend.service;
import com.example.backend.entity.HoaDon;
import com.example.backend.model.AdminHoaDonDetail;
import com.example.backend.model.AdminHoaDonResponn;
import com.example.backend.model.AdminHoaDonSanPham;
import com.example.backend.repository.HoaDonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class HoaDonServicee {
    @Autowired
    HoaDonRepository hoaDonRepository;


    public List<AdminHoaDonResponn> getALL() {
        return hoaDonRepository.getALLHD();
    }

    public List<AdminHoaDonResponn> getALLTT(int tt) {
        return hoaDonRepository.getALLHDTT(tt);
    }
    public List<AdminHoaDonResponn> timHoaDon(String tim, int loai, java.sql.Date bd, Date kt){
        return hoaDonRepository.search(tim,loai,bd,kt);
    }
    public AdminHoaDonDetail getByID(UUID id){
        return hoaDonRepository.detailHD(id);
    }
    public HoaDon updateHD(HoaDon hoaDon,String id){
        HoaDon hoaDon1= findHoaDonbyID(id);
        Optional<HoaDon> optional = hoaDonRepository.findById(id);
        return optional.map(o->{
            o.setTrangThai((hoaDon1.getTrangThai())+1);
            return hoaDonRepository.save(o);
        }).orElse(null);
//         return hoaDonResponn.save(hoaDon);

    }
    public HoaDon findHoaDonbyID(String id){
        return  hoaDonRepository.getById(id);
    }

    public List<AdminHoaDonSanPham> detailHDSanPham(UUID key){
        return  hoaDonRepository.detailHDSanPham(key);
    }
//    public LichSuHoaDon add(LichSuHoaDon kh){
//        return khachHangRespon.save(kh);
//    }
//    public LichSuHoaDon update(LichSuHoaDon kh, String ma){
//        Optional<LichSuHoaDon> optional =khachHangRespon.findById(ma);
//        return optional.map(o->{
//            o.setTenKhachHang(kh.getTenKhachHang());
//            o.setSinhNhat(kh.getSinhNhat());
//            o.setGioiTinh(kh.getGioiTinh());
//            o.setSoDienThoai(kh.getSoDienThoai());
//            o.setDiaChi(kh.getDiaChi());
//            return khachHangRespon.save(o);
//        }).orElse(null);
//    }
//    public LichSuHoaDon delete(String ma){
//        Optional<LichSuHoaDon> optional=khachHangRespon.findById(ma);
//        return optional.map(o->{
//             khachHangRespon.delete(o);
//             return o;
//        }).orElse(null) ;
//    }
}
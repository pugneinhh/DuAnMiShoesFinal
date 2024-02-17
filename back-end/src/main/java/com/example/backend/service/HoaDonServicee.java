package com.example.backend.service;
import com.example.backend.dto.request.GioHangRequest;
import com.example.backend.dto.request.HoaDonRequest;
import com.example.backend.dto.request.hoadonsearch.HoaDonSearch;
import com.example.backend.dto.request.sanphamsearch.BangConSearch;
import com.example.backend.dto.response.AdminHoaDonDetailRespon;
import com.example.backend.dto.response.AdminHoaDonResponn;
import com.example.backend.dto.response.sanpham.DanhMucRespone;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminBillForSellRespon;
import com.example.backend.model.AdminHoaDonSanPham;
import com.example.backend.repository.HoaDonRepository;
import com.example.backend.repository.NguoiDungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HoaDonServicee {
    @Autowired
    HoaDonRepository hoaDonRepository;

    @Autowired
    NguoiDungRepository nguoiDungRepository;

    public List<AdminHoaDonResponn> getALL() {
        return hoaDonRepository.getALLHD();
    }
    public List<AdminHoaDonResponn> getHoaDonChoTaiQuay() {
        return hoaDonRepository.getHoaDonChoTaiQuay();
    }
    public List<AdminBillForSellRespon> getAllBill() {
        return hoaDonRepository.getAllBill();
    }

    public HoaDon deleteHoaDon(String idHD) {
        HoaDon hoaDon = hoaDonRepository.findById(idHD).get();
        hoaDon.setTrangThai(-1);
        return  hoaDonRepository.save(hoaDon);
    }
    public List<AdminBillForSellRespon> getAllBillToday() {
        return hoaDonRepository.getAllBillToday();
    }

    public List<AdminHoaDonResponn> getALLTT(int tt) {
        return hoaDonRepository.getALLHDTT(tt);
    }

    public AdminHoaDonDetailRespon getByID(String id){
        return hoaDonRepository.detailHD(id);
    }

    public HoaDon updateKH(String idHD,String idKH){
        HoaDon hoaDon = hoaDonRepository.getHoaDonByIDHD(idHD);
        NguoiDung nguoiDung = nguoiDungRepository.findById(idKH).get();
        System.out.println("hoa don"+hoaDon);
        hoaDon.setNguoiDung(nguoiDung);
        return hoaDonRepository.save(hoaDon);
    }

    public HoaDon updateReturnKhachLe(String idHD){
        HoaDon hoaDon = hoaDonRepository.getHoaDonByIDHD(idHD);
        hoaDon.setNguoiDung(null);
        System.out.println("hoa don"+hoaDon);
        return hoaDonRepository.save(hoaDon);
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
        return  hoaDonRepository.findById(id).get();
    }

    public List<AdminHoaDonSanPham> detailHDSanPham(String  key){
        return  hoaDonRepository.detailHDSanPham(key);
    }
    public HoaDon add(HoaDonRequest hoaDonRequest){
        HoaDon hoaDon= hoaDonRequest.map(new HoaDon());
        return  hoaDonRepository.save(hoaDon);

    }

    public List<AdminHoaDonResponn> getTim(HoaDonSearch hoaDonSearch)
    {
        return hoaDonRepository.timKiemHoaDon(hoaDonSearch);
    }
//    public HoaDon addHoaDonClient(GioHangRequest request){
//        HoaDon hd=new HoaDon();
//        hd.setLoaiHoaDon(0);
//        hd.setNguoiDung(NguoiDung.builder().id(request.getKhachHang()).build());
//        return hoaDonRepository.save(hd);
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
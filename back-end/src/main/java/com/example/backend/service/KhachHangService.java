package com.example.backend.service;

import com.example.backend.dto.impldto.KhachHangResponImplDTO;
import com.example.backend.dto.request.KhachHangRequest;
import com.example.backend.dto.response.KhachHangRespon;
import com.example.backend.entity.DiaChi;
import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminKhachHangRepon;
import com.example.backend.repository.DiaChiRepository;
import com.example.backend.repository.NguoiDungRepository;
import com.example.backend.util.EmailServiceImpl;
import com.example.backend.util.cloudinary.UploadImageToCloudinary;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class KhachHangService {
    @Autowired
    NguoiDungRepository nguoiDungRepository;
    @Autowired
    DiaChiRepository diaChiRepository;
    @Autowired
    private EmailServiceImpl emailService;
    @Autowired
    private UploadImageToCloudinary uploadImageToCloudinary;

    public List<AdminKhachHangRepon> getAll(){
        return  nguoiDungRepository.getAllKhachHang();
    }


   public KhachHangResponImplDTO add(KhachHangRequest request, MultipartFile file){
       String password = RandomStringUtils.random(8, true, true);
       String url = uploadImageToCloudinary.uploadImage(file);
       int size=nguoiDungRepository.getAllKhachHang().size()+1;
       emailService.sendEmailPasword(request.getEmail(),"Mật khẩu bạn là ",password);
       NguoiDung add= new NguoiDung();
       add.setTen(request.getTen());
       add.setMa("KH"+size);
       add.setEmail(request.getEmail());
       add.setGioiTinh(request.getGioiTinh());
       add.setChucVu("khach_hang");
       add.setDiem(0);
       add.setChungMinhThu(request.getCanCuocCongDan());
       add.setTrangThai(0);
       add.setNgaySinh(request.getNgaySinh());
       add.setAnh(url);
       add.setMatKhau(password);
       add.setNgayTao(LocalDateTime.now());
       add.setNgayThamGia(LocalDateTime.now());
       add.setSoDienThoai(request.getSoDienThoai());
       nguoiDungRepository.save(add);

       DiaChi diaChi = new DiaChi();
       diaChi.setDiaChi(request.getDiaChi());
       diaChi.setTenThanhPho(request.getTenThanhPho());
       diaChi.setTenHuyen(request.getTenHuyen());
       diaChi.setTenXa(request.getTenXa());
       diaChi.setIdThanhPho(request.getIdThanhPho());
       diaChi.setIdHuyen(request.getIdHuyen());
       diaChi.setIdXa(request.getIdXa());
       diaChi.setTenNguoiNhan(request.getTen());
       diaChi.setSoDienThoai(request.getSoDienThoai());
       diaChi.setNguoiDung(add);
       diaChi.setTrangThai(0);
       diaChiRepository.save(diaChi);
       return new KhachHangResponImplDTO(add,diaChi);
   }

    @Async
    @Transactional
    public KhachHangResponImplDTO update(KhachHangRequest request, MultipartFile file){
        Optional<NguoiDung> optional = nguoiDungRepository.findById(request.getId());
        // todo: update user

        NguoiDung update =optional.get();
        update.setTen(request.getTen());
        update.setEmail(request.getEmail());
        update.setGioiTinh(request.getGioiTinh());
        update.setChungMinhThu(request.getCanCuocCongDan());
        update.setTrangThai(request.getTrangThai());
        update.setNgaySinh(request.getNgaySinh());
        update.setAnh(file==null?optional.get().getAnh(): uploadImageToCloudinary.uploadImage(file));
        update.setSoDienThoai(request.getSoDienThoai());
        update.setNgaySua(LocalDateTime.now());
        nguoiDungRepository.save(update);

        DiaChi diaChi= diaChiRepository.findByUserAndStatus(update.getId());
        diaChi.setDiaChi(request.getDiaChi());
        diaChi.setTenThanhPho(request.getTenThanhPho());
        diaChi.setTenHuyen(request.getTenHuyen());
        diaChi.setTenXa(request.getTenXa());
        diaChi.setIdThanhPho(request.getIdThanhPho());
        diaChi.setIdHuyen(request.getIdHuyen());
        diaChi.setIdXa(request.getIdXa());
        diaChi.setTenNguoiNhan(request.getTen());
        diaChi.setSoDienThoai(request.getSoDienThoai());
        diaChi.setNguoiDung(update);
        diaChi.setTrangThai(0);
        return  new KhachHangResponImplDTO(update,diaChi);
    }
    public KhachHangRespon getByID(String id){
        KhachHangRespon optional = nguoiDungRepository.findByIdCustomer(id);
        return optional;

    }
    public  KhachHangResponImplDTO updateStatus(String id,String status){
        Optional<NguoiDung> optional =nguoiDungRepository.findById(id);
        optional.get().setTrangThai(1);
        nguoiDungRepository.save(optional.get());
        return  new KhachHangResponImplDTO(optional.get());
    }

}

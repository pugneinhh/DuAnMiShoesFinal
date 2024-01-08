package com.example.backend.service;

import com.example.backend.dto.impldto.NhanVienResponseImplDTO;
import com.example.backend.dto.request.NhanVienRequest;
import com.example.backend.entity.DiaChi;
import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminNhanVienRespon;
import com.example.backend.repository.DiaChiRepository;
import com.example.backend.repository.NguoiDungRepository;
import com.example.backend.util.EmailServiceImpl;
import com.example.backend.util.cloudinary.UploadImageToCloudinary;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Service
public class NhanVienService {
    @Autowired
    NguoiDungRepository nguoiDungRepository;
    @Autowired
    DiaChiRepository diaChiRepository;
    @Autowired
    private EmailServiceImpl emailService;
    @Autowired
    private UploadImageToCloudinary uploadImageToCloudinary;

    public List<AdminNhanVienRespon> getAll(){
        return nguoiDungRepository.getAllNhanVien();
    }

   public NhanVienResponseImplDTO add(NhanVienRequest request, MultipartFile file){
       String password = RandomStringUtils.random(8, true, true);
       String url = uploadImageToCloudinary.uploadImage(file);
       int size=nguoiDungRepository.getAllNhanVien().size()+1;
       emailService.sendEmailPasword(request.getEmail(),"Mật khẩu bạn là ",password);
       NguoiDung add= new NguoiDung();
       add.setTen(request.getTen());
       add.setMa("NV"+size);
       System.out.println("NV"+(nguoiDungRepository.getAllNhanVien().size()+1));
       add.setEmail(request.getEmail());
       add.setGioiTinh(request.getGioiTinh());
       add.setChucVu("nhan_vien");
       add.setDiem(0);
       add.setChungMinhThu(request.getCanCuocCongDan());
       add.setTrangThai(0);
       add.setNgaySinh(request.getNgaySinh());
       add.setAnh(url);
       add.setMatKhau(password);
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

       return  new NhanVienResponseImplDTO(add,diaChi);
   }

}

package com.example.backend.service;

import com.example.backend.dto.login.TokenService;
import com.example.backend.dto.request.DoiMatKhauRequest;
import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminKhachHangRepon;
import com.example.backend.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NguoiDungService {
    @Autowired
    NguoiDungRepository nguoiDungRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    TokenService tokenService;

    public List<AdminKhachHangRepon> getKhach() {
        return nguoiDungRepository.getAllKhachHang();
    }

    public NguoiDung findByToken(String token) {
        if (tokenService.getUserNameByToken(token) == null) {
            return null;
        }
        String userName = tokenService.getUserNameByToken(token);
        NguoiDung nguoiDung = nguoiDungRepository.findByEmail(userName).orElse(null);
        return nguoiDung;
    }

    public NguoiDung findByID(String id) {
        return nguoiDungRepository.getNDByID(id);
    }

    public List<NguoiDung> getAll() {
        return nguoiDungRepository.findAll();
    }

    public Boolean doiMatKhau(String id, DoiMatKhauRequest doiMatKhauRequest) {
        NguoiDung nguoiDung = findByID(id);
        if (!passwordEncoder.matches(doiMatKhauRequest.getMatKhauCu(), nguoiDung.getMatKhau())) {
            return false;
        }
        nguoiDung.setMatKhau(passwordEncoder.encode(doiMatKhauRequest.getMatKhau()));
        nguoiDung.setNgaySua(LocalDateTime.now());
        nguoiDungRepository.save(nguoiDung);
        return true;

    }

}

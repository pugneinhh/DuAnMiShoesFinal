package com.example.backend.service;

import com.example.backend.entity.HoaDon;
import com.example.backend.entity.NguoiDung;
import com.example.backend.entity.ThongBao;
import com.example.backend.repository.HoaDonRepository;
import com.example.backend.repository.ThongBaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ThongBaoService {
    @Autowired
    ThongBaoRepository thongBaoRepository;
    @Autowired
    HoaDonRepository hoaDonRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    public void thanhToan(String idHD) {
        HoaDon hoaDon = hoaDonRepository.findById(idHD).get();
        ThongBao thongBao = new ThongBao();
        thongBao.setLoai(0);//thanh toán
        if(hoaDon.getNguoiDung() == null){
            thongBao.setNguoiDung(null);
        }else{
            thongBao.setNguoiDung(NguoiDung.builder().id(hoaDon.getNguoiDung().getId()).build());
        }
        thongBao.setHoaDon(hoaDon);
        thongBao.setNoiDung("hóa đơn " + hoaDon.getMa() + " chờ xác nhận");
        thongBao.setTrangThai(0);//0 : chưa xem, 1: đã xem
        thongBaoRepository.save(thongBao);
        messagingTemplate.convertAndSend("/topic/admin/hoa-don",thongBao);
    }
}

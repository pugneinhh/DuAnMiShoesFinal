package com.example.backend.service;

import com.example.backend.dto.request.ThanhToanRequest;
import com.example.backend.dto.response.LichSuThanhToanRespon;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.NguoiDung;
import com.example.backend.entity.ThanhToan;
import com.example.backend.infrastructure.email.EmailSenderService;
import com.example.backend.infrastructure.exportPdf.ExportFilePdfFormHtml;
import com.example.backend.model.BienLaiHoaDon;
import com.example.backend.repository.HoaDonRepository;
import com.example.backend.repository.NguoiDungRepository;
import com.example.backend.repository.ThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.List;

@Service
public class ThanhToanService {

    private static String BASE_FRONTEND_ENDPOINT = "http://localhost:3000";
    @Autowired
    ThanhToanRepository thanhToanRepository;

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    ExportFilePdfFormHtml exportFilePdfFormHtml;

    @Autowired
    private SpringTemplateEngine springTemplateEngine;

@Autowired
private EmailSenderService emailSenderService;
    public ThanhToan thanhToan(ThanhToanRequest request) {
        ThanhToan tt = request.map(new ThanhToan());

       ThanhToan thanhToan =  thanhToanRepository.save(tt);
       sendMailOnline(thanhToan.getHoaDon().getId());
        return thanhToan;
    }

    public List<LichSuThanhToanRespon> getALLLLichSuThanhToanByIDHD(String id) {
        return thanhToanRepository.getALLLLichSuThanhToanByIDHD(id);
    }

    //    public ThanhToan thanhToanTienMat(ThanhToanRequest request){
//        ThanhToan tt = request.map(new ThanhToan())
//    }
    public ThanhToan getThanhToanByIdHD(String idHD) {
        return thanhToanRepository.getThanhToanByIdHD(idHD);
    }


    public void sendMailOnline(String idHoaDon) {
        String finalHtml = null;
        HoaDon hoaDon = hoaDonRepository.findAllById(idHoaDon);
        BienLaiHoaDon invoice = exportFilePdfFormHtml.getInvoiceResponse(hoaDon);
       NguoiDung user = nguoiDungRepository.findAllById(hoaDon.getNguoiDung().getId());
        sendMail(invoice,  user.getEmail(),BASE_FRONTEND_ENDPOINT + "/hd/"+hoaDon.getId());
//        sendMail(invoice, user.getEmail());
        //}
    }

    public void sendMail(BienLaiHoaDon invoice,String email,String url) {

        String finalHtmlSendMail = null;
        Context dataContextSendMail = exportFilePdfFormHtml.setDataSendMail(invoice, url);
        finalHtmlSendMail = springTemplateEngine.process("BillMail", dataContextSendMail);
        String subject = "Biên lai ";
        emailSenderService.sendSimpleEmail(email, subject, finalHtmlSendMail);

    }
}

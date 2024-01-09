package com.example.backend.dto.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface DetailCTSPRespone {
    @Value("#{target.idSP}")
    String getIdSP();

    @Value("#{target.idC}")
    String getIdC();

    @Value("#{target.tenSP}")
    String getTenSP();

    @Value("#{target.idKT}")
    String getIdKT();

    @Value("#{target.idMS}")
    String getIdMS();

    @Value("#{target.idCL}")
    String getIdCL();

    @Value("#{target.idDC}")
    String getIdDC();

    @Value("#{target.IdDM}")
    String getIdDM();

    @Value("#{target.idH}")
    String getIdH();

    @Value("#{target.soLuong}")
    int getSoLuong();

    @Value("#{target.giaBan}")
    BigDecimal getGiaBan();

    @Value("#{target.moTa}")
    String getMoTa();

    @Value("#{target.trangThai}")
    int getTrangThai();
}

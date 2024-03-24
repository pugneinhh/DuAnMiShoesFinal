package com.example.backend.dto.request.HoaDonCLient;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class HoaDonClientRequest {
    private BigDecimal tongTien;

    private BigDecimal tienShip;

    private BigDecimal tienSauGiam;

    private String idUser;

    private String idVoucher;

    private String idPayMethod;

    private List<KHHoaDonChiTietRequest> listHDCT;


}

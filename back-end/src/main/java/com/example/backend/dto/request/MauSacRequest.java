package com.example.duanmishoes.dto.request;

import com.example.duanmishoes.util.Status;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MauSacRequest {

    private String ma;

    private String ten;

//    private Date ngayTao;
//
//    private Date ngaySua;
//
//    private String nguoiTao;
//
//    private String nguoiSua;

    private Status trangThai;
}

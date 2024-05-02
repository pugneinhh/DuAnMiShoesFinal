package com.example.backend.dto.request.sanpham;


import com.example.backend.entity.KichThuoc;
import com.example.backend.entity.MauSac;
import com.example.backend.util.Status;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MauSacRequest {

    private String ma;

    private String ten;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private String nguoiTao;

    private String nguoiSua;

    private int trangThai;

    public MauSac mapMS(MauSac ms){
        ms.setMa(this.ma);
        ms.setTen(this.ten);
        ms.setNgayTao(this.ngayTao);
        ms.setNgaySua(this.ngaySua);
        ms.setNguoiTao(this.nguoiTao);
        ms.setNguoiSua(this.nguoiSua);
        ms.setTrangThai(this.trangThai);
        return ms;
    }
}

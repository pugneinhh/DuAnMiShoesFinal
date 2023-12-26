package com.example.duanmishoes.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VoucherSearch {
    String tenVoucher;
    String trangThaiVoucher;
    String phuongThucVoucher;
    String loaiVoucher;
    Date ngayBDVoucher;
    Date ngayKTVoucher;

}

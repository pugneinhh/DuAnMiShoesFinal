package com.example.backend.dto.request.hoadonsearch;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HoaDonSearch {
    String tenHD;

    int loaiHD;
    Date ngayBDHD;
    Date ngayKTHD;
}

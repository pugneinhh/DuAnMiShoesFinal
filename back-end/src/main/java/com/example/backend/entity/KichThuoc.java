package com.example.duanmishoes.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.UUID;

@Entity
@Table(name = "kich_thuoc")
@Data
public class KichThuoc {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String ma;

    private String ten;

    private Date ngayTao;

    private Date ngaySua;

    private String nguoiTao;

    private String nguoiSua;

    private int trangThai;
}

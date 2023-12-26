package com.example.duanmishoes.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Table(name = "hang")
@Data
public class Hang {
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

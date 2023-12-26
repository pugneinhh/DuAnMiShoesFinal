package com.example.duanmishoes.entity;

import com.example.duanmishoes.util.Status;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "mau_sac")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class MauSac {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String ma;
    private String ten;

    private Date ngayTao;

    private Date ngaySua;

    private String nguoiTao;

    private String nguoiSua;

    @Enumerated(EnumType.STRING)
    private Status trangThai;
}


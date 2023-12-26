package com.example.duanmishoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name="san_pham")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String ma;
    private String ten;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private String nguoiTao;
    private String nguoiSua;
    private int trangThai;

}

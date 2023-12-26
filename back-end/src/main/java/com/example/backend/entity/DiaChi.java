
package com.example.duanmishoes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "dia_chi")
@Entity
public class DiaChi {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String tenNguoiNhan;

    private String soDienThoai;
    private String diaChi;
    private String idXa;
    private String idHuyen;
    private String idThanhPho;
    private String idQuocGia;
    private String tenXa;
    private String tenHuyen;
    private String tenThanhPho;
    private String quocGia;
    private int trangThai;

}

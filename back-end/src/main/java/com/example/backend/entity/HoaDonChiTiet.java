package com.example.duanmishoes.entity;

import com.example.duanmishoes.entity.IDHoaDonChiTiet;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "hoa_don_chi_tiet")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Data
public class HoaDonChiTiet {
    @EmbeddedId
    private IDHoaDonChiTiet id;
    private int soLuong;
    private BigDecimal giaSauGiam;
    private BigDecimal giaGiam;
    private String nguoiTao;
    private String nguoiSua;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private int trangThai;
}

package com.example.duanmishoes.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Locale;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "khuyen_mai")
public class KhuyenMai {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String ma;
    private String ten;
    private BigDecimal giaTriKhuyenMai;
    private LocalDateTime ngayBatDau;
    private LocalDateTime ngayKetThuc;
    private String loai;
    private String nguoiTao;
    private String nguoiSua;
    private Date ngayTao;
    private Date ngaySua;
    private Integer trangThai;

    @Override
    public String toString() {
        return ten;

    }

    public String formatCurrency(){
        Locale loc = new Locale("vi","VN");
        NumberFormat nf = NumberFormat.getCurrencyInstance(loc);
        return  nf.format(this.giaTriKhuyenMai);

    }

    public String formatDate(LocalDateTime ldt){
        return ldt.getHour()+":"+ldt.getMinute()+ " - "+ldt.getDayOfMonth()+"/"+ldt.getMonthValue()+"/"+ldt.getYear();
    }
}

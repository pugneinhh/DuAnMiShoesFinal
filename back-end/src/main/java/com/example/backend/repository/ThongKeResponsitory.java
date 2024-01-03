package com.example.backend.repository;


import com.example.backend.dto.response.ThongKeRespon;
import com.example.backend.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;


@Repository
public interface ThongKeResponsitory extends JpaRepository<HoaDon, String> {

    @Query(value = """
SELECT  CASE WHEN sum(thanh_tien) IS NULL  THEN 0 ELSE sum(thanh_tien) END  as tongTienThongKe
, count(ma) AS tongHoaDonThongKe
FROM duanmishoes.hoa_don where  cast(hoa_don.ngay_tao AS DATE)=date(curdate())

            """, nativeQuery = true)
    ThongKeRespon thongKeTheoNgay();
    @Query(value = """
SELECT  CASE WHEN sum(thanh_tien) IS NULL  THEN 0 ELSE sum(thanh_tien) END  as tongTienThongKe
, count(ma) AS tongHoaDonThongKe
FROM duanmishoes.hoa_don where  month(ngay_tao)=month(curdate()) and year(ngay_tao)=year(curdate())
            """, nativeQuery = true)
    ThongKeRespon thongKeTheoThang();
    @Query(value = """
    SELECT  CASE WHEN sum(thanh_tien) IS NULL  THEN 0 ELSE sum(thanh_tien) END  as tongTienThongKe
, count(ma) AS tongHoaDonThongKe
    FROM duanmishoes.hoa_don where year(ngay_tao)=year(curdate())
            """, nativeQuery = true)
    ThongKeRespon thongKeTheoNam();


}

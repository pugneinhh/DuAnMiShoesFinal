package com.example.duanmishoes.respon;


import com.example.duanmishoes.model.AdminHoaDonTimeLineRes;
import com.example.duanmishoes.model.AdminHoaDonTimeLineRespon;
import com.example.duanmishoes.entity.LichSuHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LichSuHoaDonRespon extends JpaRepository<LichSuHoaDon, String> {
 @Query(value = """
 SELECT mo_ta_hoat_dong AS moTaHoatDong,trang_thai AS trangThai,nguoi_tao AS nguoiTao,ngay_tao AS ngayTao
 FROM dbo.lich_su_hoa_don WHERE  hoa_don_id=:idHD ORDER BY trangThai ASC""",nativeQuery = true)
 List<AdminHoaDonTimeLineRespon> detailLichSuHoaDon(UUID idHD);
 @Query(value = """
  SELECT ngay_tao AS hdTimeLine,trang_thai AS trangThai FROM  dbo.lich_su_hoa_don WHERE hoa_don_id=:idHD ORDER BY trangThai ASC""",nativeQuery = true)
 List<AdminHoaDonTimeLineRes> HoaDonTimeLine(UUID idHD);
}

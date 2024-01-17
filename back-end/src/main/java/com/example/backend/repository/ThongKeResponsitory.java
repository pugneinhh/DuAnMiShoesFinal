package com.example.backend.repository;


import com.example.backend.dto.response.BieuDoRespon;
import com.example.backend.dto.response.SanPhamBanChayRespon;
import com.example.backend.dto.response.ThongKeRespon;
import com.example.backend.dto.response.TrangThaiHoaDonRespon;
import com.example.backend.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;


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

    @Query(value=" select distinct hoa_don_chi_tiet.chi_tiet_san_pham_id,min(hinh_anh.url) as linkAnh,san_pham.ten as tenSp,mau_sac.ten as mauSac,kich_thuoc.ten as kichThuoc,hang.ten as hang,chi_tiet_san_pham.gia_ban,(hoa_don_chi_tiet.so_luong) from hoa_don_chi_tiet \n" +
            "join chi_tiet_san_pham on chi_tiet_san_pham.id =hoa_don_chi_tiet.chi_tiet_san_pham_id\n" +
            "join san_pham on san_pham.id=chi_tiet_san_pham.san_pham_id\n" +
            "join mau_sac on mau_sac.id=chi_tiet_san_pham.mau_sac_id\n" +
            "join kich_thuoc on kich_thuoc.id=chi_tiet_san_pham.kich_thuoc_id\n" +
            "join de_giay on de_giay.id=chi_tiet_san_pham.de_giay_id\n" +
            "join hang on hang.id=chi_tiet_san_pham.hang_id\n" +
            "join danh_muc on danh_muc.id=chi_tiet_san_pham.danh_muc_id\n" +
            "join hinh_anh on hinh_anh.chi_tiet_san_pham_id=chi_tiet_san_pham.id\n" +
            "join chat_lieu on chat_lieu.id=chi_tiet_san_pham.chat_lieu_id\n" +
            "group by hoa_don_chi_tiet.chi_tiet_san_pham_id ,hoa_don_chi_tiet.so_luong,hoa_don_chi_tiet.ngay_tao,hinh_anh.url,mau_sac.ten,kich_thuoc.ten,hang.ten,chi_tiet_san_pham.gia_ban\n" +
            "having year(hoa_don_chi_tiet.ngay_tao)=year(curdate()) and month(hoa_don_chi_tiet.ngay_tao)=month(current_date())\n" +
            "order by hoa_don_chi_tiet.so_luong desc limit 5",nativeQuery = true)
    List<SanPhamBanChayRespon> getSPBanChay();
    @Query(value = "Select DATE(hoa_don_chi_tiet.ngay_tao) AS ngay,count(distinct hoa_don_chi_tiet.hoa_don_id) as tongHoaDon,sum(hoa_don_chi_tiet.so_luong) as tongSanPham from hoa_don_chi_tiet \n" +
            "where hoa_don_chi_tiet.ngay_tao=:ngay  group by hoa_don_chi_tiet.ngay_tao",nativeQuery = true)
    BieuDoRespon getBieuDoNgay(Date ngay);
    @Query(value = "Select DATE(hoa_don_chi_tiet.ngay_tao) AS ngay, count(distinct hoa_don_chi_tiet.hoa_don_id) as tongHoaDon,sum(hoa_don_chi_tiet.so_luong) as tongSanPham from hoa_don_chi_tiet \n" +
            "where yearweek(hoa_don_chi_tiet.ngay_tao)= yearweek(:ngay)  group by hoa_don_chi_tiet.ngay_tao,",nativeQuery = true)
    BieuDoRespon getBieuDoTuan(Date ngay);
    @Query(value = "Select DATE(hoa_don_chi_tiet.ngay_tao) AS ngay,count(distinct hoa_don_chi_tiet.hoa_don_id) as tongHoaDon,sum(hoa_don_chi_tiet.so_luong) as tongSanPham from hoa_don_chi_tiet \n" +
            "where year(hoa_don_chi_tiet.ngay_tao)= year(:ngay) and month(hoa_don_chi_tiet.ngay_tao)=month(:ngay)  group by hoa_don_chi_tiet.ngay_tao,",nativeQuery = true)
    BieuDoRespon getBieuDoThang(Date ngay);
    @Query(value = "select hoa_don.trang_thai,count(hoa_don.id) as soLuong from hoa_don where year(hoa_don.ngay_tao)=year(current_date()) and month(hoa_don.ngay_tao)=month(current_date())",nativeQuery = true)
    List<TrangThaiHoaDonRespon> getTrangThaiHoaDon();
}

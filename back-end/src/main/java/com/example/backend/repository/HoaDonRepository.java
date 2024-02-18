package com.example.backend.repository;


import com.example.backend.dto.request.hoadonsearch.HoaDonSearch;
import com.example.backend.dto.response.AdminHoaDonDetailRespon;
import com.example.backend.dto.response.AdminHoaDonResponn;
import com.example.backend.entity.HoaDon;
import com.example.backend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, String> {
    // from hóa đơn
    @Query(value = """
            SELECT hd.id AS idHD,  hd.ma AS ma, hd.nhan_vien_id as maNV, CASE WHEN hd.khach_hang_id IS NULL  THEN N'Khách lẻ'
                        ELSE kh.ten END  as tenKH ,
                 	CASE WHEN hd.khach_hang_id IS  NULL   THEN N''
                        ELSE kh.so_dien_thoai END  as sdt,
                             ngay_mua as ngayMua,thanh_tien as thanhTien,hd.trang_thai as trangThai,hd.loai_hoa_don AS loaiHD FROM duanmishoes.hoa_don hd
                 		 	LEFT JOIN duanmishoes.nguoi_dung kh ON kh.id = hd.khach_hang_id ORDER BY ngayMua desc 
                     """, nativeQuery = true)
    List<AdminHoaDonResponn> getALLHD();
    @Query(value = """
                    SELECT hd.id AS idHD,  hd.ma AS ma, hd.nhan_vien_id as maNV, CASE WHEN hd.khach_hang_id IS NULL  THEN N'Khách lẻ'
                                    ELSE kh.ten END  as tenKH ,
                             	CASE WHEN hd.khach_hang_id IS  NULL   THEN N''
                                    ELSE kh.so_dien_thoai END  as sdt,
                                         ngay_mua as ngayMua,thanh_tien as thanhTien,hd.trang_thai as trangThai,hd.loai_hoa_don AS loaiHD FROM duanmishoes.hoa_don hd
                             		 	LEFT JOIN duanmishoes.nguoi_dung kh ON kh.id = hd.khach_hang_id  where hd.loai_hoa_don=1 and hd.trang_thai=0
            """,nativeQuery = true)
    List<AdminHoaDonResponn> getHoaDonChoTaiQuay();
    @Query(value = """
                         SELECT hd.id AS idHD,  hd.ma AS ma, hd.nhan_vien_id as maNV, CASE WHEN hd.khach_hang_id IS NULL  THEN N'Khách lẻ'
                                      ELSE kh.ten END  as tenKH ,
                               	CASE WHEN hd.khach_hang_id IS  NULL   THEN N''
                                      ELSE kh.so_dien_thoai END  as sdt,
                                           ngay_mua as ngayMua,thanh_tien as thanhTien,hd.trang_thai as trangThai,hd.loai_hoa_don AS loaiHD FROM duanmishoes.hoa_don hd
                               		 	LEFT JOIN duanmishoes.nguoi_dung kh ON kh.id = hd.khach_hang_id where hd.trang_thai=:tt ORDER BY ngayMua desc 
            """,
            nativeQuery = true)
    List<AdminHoaDonResponn> getALLHDTT(int tt);

    //    @Query("select o from KhachHang o where o.ten=:keyword or o.ma=:keyword")List<KhachHang> search(@Param("keyword")String keyword)

    @Query(value = """
            SELECT hd.ghi_chu AS ghiChuHD, hd.id AS idHD,hd.ma AS ma, hd.nhan_vien_id AS maNV, CASE\s
                     WHEN hd.khach_hang_id IS NULL  THEN N'Khách lẻ'
                     ELSE kh.ten END  as tenKH ,CASE WHEN hd.so_dien_thoai is  NULL   THEN N''
                     ELSE hd.so_dien_thoai END  as sdt,\s
               CASE WHEN hd.dia_chi IS  NULL THEN N''
                     else hd.dia_chi end as diaChi,
               ngay_mua as ngayMua,hd.thanh_tien as thanhTien,hd.trang_thai as trangThai,hd.loai_hoa_don AS loaiHD
               		 FROM  duanmishoes.hoa_don hd LEFT JOIN duanmishoes.nguoi_dung kh ON kh.id = hd.khach_hang_id\s
               	WHERE hd.id=:key
            	    """,
            nativeQuery = true)
    AdminHoaDonDetailRespon detailHD(String key);

    @Query(value = """
            SELECT hdct.so_luong AS soLuongSP, ctsp.gia_ban AS giaBanSP,CASE WHEN ha.url is  NULL   THEN N'khong co'
                               ELSE ha.url END as urlHA,sp.ten AS tenSP, kt.ten AS tenKichThuoc,ms.ma AS tenMauSac,
                h.ten AS tenHang,hdct.gia_sau_giam as thanhTienSP FROM  duanmishoes.hoa_don_chi_tiet hdct
               			LEFT JOIN  duanmishoes.chi_tiet_san_pham ctsp ON ctsp.id = hdct.chi_tiet_san_pham_id
               			LEFT JOIN duanmishoes.hinh_anh ha ON ha.chi_tiet_san_pham_id = ctsp.id
               			LEFT JOIN duanmishoes.san_pham sp ON sp.id = ctsp.san_pham_id
               			LEFT JOIN duanmishoes.kich_thuoc kt ON kt.id = ctsp.kich_thuoc_id
               			LEFT JOIN duanmishoes.mau_sac ms ON ms.id = ctsp.mau_sac_id
               			LEFT JOIN duanmishoes.hang h ON h.id = ctsp.hang_id WHERE hdct.hoa_don_id=:key
                           	    """,
            nativeQuery = true)
    List<AdminHoaDonSanPham> detailHDSanPham(String key);

    @Query(value = """
            select
            	hd.id as idHD,
            	hd.ma as ma,
            	hd.nhan_vien_id as maNV,
            	case
            		when hd.khach_hang_id is null then N'Khách lẻ'
            		else kh.ten
            	end as tenKH ,
            	case
            		when hd.khach_hang_id is null then N''
            		else kh.so_dien_thoai
            	end as sdt,
            	ngay_mua as ngayMua,
            	thanh_tien as thanhTien,
            	hd.trang_thai as trangThai,
            	hd.loai_hoa_don as loaiHD
            from
            	duanmishoes.hoa_don hd
            left join duanmishoes.nguoi_dung kh on
            	kh.id = hd.khach_hang_id
            where
            	(:#{#hoaDonSearch.tenHD} IS NULL OR hd.ma like (%:#{#hoaDonSearch.tenHD}%) OR kh.ten like (%:#{#hoaDonSearch.tenHD}%) OR kh.so_dien_thoai like (%:#{#hoaDonSearch.tenHD}%)) AND
                (:#{#hoaDonSearch.loaiHD} IS NULL OR hd.loai_hoa_don =:#{#hoaDonSearch.loaiHD}) AND
                (:#{#hoaDonSearch.ngayBDHD} IS NULL OR (:#{#hoaDonSearch.ngayKTHD}) IS NULL OR ngay_mua between (:#{#hoaDonSearch.ngayBDHD}) AND (:#{#hoaDonSearch.ngayKTHD}))
                                        """,
            nativeQuery = true)
    List<AdminHoaDonResponn> timKiemHoaDon(HoaDonSearch hoaDonSearch);

    // Hoa don cho ban hang
    @Query(value = """
                    SELECT hd.id AS id,  hd.ma AS ma, hd.nhan_vien_id as nhanVienID, hd.nguoi_tao as nhanVien ,
                    CASE WHEN hd.khach_hang_id IS NULL THEN N'Khách lẻ' ELSE kh.ten END  as tenNguoiDung ,
                    CASE WHEN hd.khach_hang_id IS NULL THEN N'' ELSE kh.id END  as nguoiDung,
                    CASE WHEN hd.khach_hang_id IS NULL THEN N'' ELSE kh.gioi_tinh END  as gtNguoiDung,
                    hd.ngay_tao as ngayTao, hd.ngay_sua as ngaySua , hd.nguoi_tao as nguoiTao , hd.nguoi_sua as nguoiSua,
                    hd.thanh_tien as thanhTien,hd.gia_goc as giaGoc,hd.gia_giam_gia AS giaGiamGia,
                    hd.ten_nguoi_nhan as tenNguoiNhan , hd.so_dien_thoai as soDienThoai , hd.email as email, hd.dia_chi as diaChi , hd.ghi_chu as ghiChu , hd.ngay_du_kien_nhan as ngayDuKienNhan , hd.tien_van_chuyen as tienVanChuyen
                    FROM duanmishoes.hoa_don hd
                    LEFT JOIN duanmishoes.nguoi_dung kh ON kh.id = hd.khach_hang_id  where hd.loai_hoa_don=1 and hd.trang_thai=0
            """,nativeQuery = true)
    List<AdminBillForSellRespon> getAllBill();

    @Query(value = "  select * from hoa_don where DATE(ngay_tao) = current_date()",nativeQuery = true)
    List<HoaDon> getAllBillToday();

    @Query(value = "select * from hoa_don where id =:id",nativeQuery = true)
    HoaDon getHoaDonByIDHD(String id);

}

package com.example.duanmishoes.respon;


import com.example.duanmishoes.entity.HoaDon;
import com.example.duanmishoes.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface HoaDonResponn extends JpaRepository<HoaDon, String> {
	// from hóa đơn
	@Query(value = """
            SELECT hd.id AS idHD,  hd.ma AS ma, nv.ma as maNV, CASE\s
                   WHEN hd.khach_hang_id IS NULL  THEN N'Khách lẻ'
                   ELSE kh.ten END  as tenKH ,
            	CASE WHEN hd.khach_hang_id IS  NULL   THEN N''
                   ELSE kh.so_dien_thoai END  as sdt,
                        ngay_mua as ngayMua,thanh_tien as thanhTien,hd.trang_thai as trangThai,hd.loai_hoa_don AS loaiHD FROM hoa_don hd
            		 	LEFT JOIN khach_hang kh ON kh.id = hd.khach_hang_id
            			JOIN nhan_vien nv ON nv.id = hd.nhan_vien_id ORDER BY hd.ma DESC
                       """, nativeQuery = true)
	List<AdminHoaDonResponn> getALLHD();

	@Query(value = """
            SELECT hd.id AS idHD,hd.ma AS ma, nv.ma as maNV,CASE\s
                   WHEN hd.khach_hang_id IS NULL  THEN N'Khách lẻ'
                   ELSE kh.ten END  as tenKH ,kh.so_dien_thoai as sdt,
                                   ngay_mua as ngayMua,thanh_tien as thanhTien,hd.trang_thai as trangThai,hd.loai_hoa_don AS loaiHD FROM hoa_don hd
                       			Left JOIN khach_hang kh ON kh.id = hd.khach_hang_id
                       			JOIN nhan_vien nv ON nv.id = hd.nhan_vien_id  where hd.trang_thai=:tt ORDER BY hd.ma DESC """,
			nativeQuery = true)
	List<AdminHoaDonResponn> getALLHDTT(int tt);

	//    @Query("select o from KhachHang o where o.ten=:keyword or o.ma=:keyword")List<KhachHang> search(@Param("keyword")String keyword)
	@Query(value = """
            SELECT hd.id AS idHD,  hd.ma AS ma, nv.ma as maNV, kh.ten as tenKH,kh.so_dien_thoai as sdt,
            hd.ngay_mua as ngayMua,hd.thanh_tien as thanhTien,hd.trang_thai as trangThai,hd.loai_hoa_don AS loaiHD FROM hoa_don hd
            JOIN khach_hang kh ON kh.id = hd.khach_hang_id
            JOIN nhan_vien nv ON nv.id = hd.nhan_vien_id  where (hd.ma=:hehe or nv.ma=:hehe or kh.so_dien_thoai like %:hehe%) 
            AND hd.loai_hoa_don =:timLoai AND hd.ngay_mua BETWEEN :bd AND :kt ORDER BY hd.ma DESC """, nativeQuery = true)
	List<AdminHoaDonResponn> search(@Param("hehe") String hehe, int timLoai, java.sql.Date bd, Date kt);

	@Query(value = """
               SELECT hd.ghi_chu AS ghiChuHD, hd.id AS idHD,hd.ma AS ma, nv.ma AS maNV, CASE 
                  WHEN hd.khach_hang_id IS NULL  THEN N'Khách lẻ'
                  ELSE kh.ten END  as tenKH ,CASE WHEN hd.khach_hang_id IS  NULL   THEN N''
                  ELSE kh.so_dien_thoai END  as sdt, 
            CASE WHEN hd.khach_hang_id IS  NULL THEN N''
                  ELSE CONCAT(dc.dia_chi,' ' , dc.phuong,' ',dc.thanh_pho) END  as diaChiKH,
            ngay_mua as ngayMua,hd.thanh_tien as thanhTien,hd.trang_thai as trangThai,hd.loai_hoa_don AS loaiHD
            		 FROM  dbo.hoa_don hd
            		 JOIN nhan_vien nv ON nv.id = hd.nhan_vien_id
            		    LEFT JOIN khach_hang kh ON kh.id = hd.khach_hang_id			
            	    LEFT JOIN dbo.dia_chi dc ON dc.id = kh.dia_chi_id 
            	WHERE hd.id=:key
            	    """,
			nativeQuery = true)
	AdminHoaDonDetail detailHD(UUID key);
	@Query(value = """
    SELECT hdct.so_luong AS soLuongSP, ctsp.gia_ban AS giaBanSP, ha.ten AS tenHA,sp.ten AS tenSP, kt.ten AS tenKichThuoc,ms.ten AS tenMauSac,
    h.ten AS tenHang,hdct.thanh_tien as thanhTienSP FROM  dbo.hoa_don_chi_tiet hdct
   			LEFT JOIN  dbo.chi_tiet_san_pham ctsp ON ctsp.id = hdct.chi_tiet_san_pham_id
   			LEFT JOIN dbo.hinh_anh ha ON ha.chi_tiet_san_pham_id = ctsp.id
   			LEFT JOIN dbo.san_pham sp ON sp.id = ctsp.san_pham_id
   			LEFT JOIN dbo.kich_thuoc kt ON kt.id = ctsp.kich_thuoc_id
   			LEFT JOIN dbo.mau_sac ms ON ms.id = ctsp.mau_sac_id
   			LEFT JOIN dbo.hang h ON h.id = ctsp.hang_id WHERE hdct.hoa_don_id=:key
          
            	    """,
			nativeQuery = true)
	List<AdminHoaDonSanPham> detailHDSanPham(UUID key);
	// form bán hàng
	@Query(value = """  
                    SELECT hd.ghi_chu AS ghiChuHD, hd.id AS idHD,hd.ma AS maHD, nv.ma AS maNV, CASE 
                    WHEN hd.khach_hang_id IS NULL  THEN N'Khách lẻ'
                    ELSE kh.ten END  as tenKH ,CASE WHEN hd.khach_hang_id IS  NULL   THEN N''
                    ELSE kh.so_dien_thoai END  as sdt, 
            		CASE WHEN hd.khach_hang_id IS  NULL THEN N''
                    ELSE CONCAT(dc.dia_chi,' ' , dc.phuong,' ',dc.thanh_pho) END  as diaChiKH,
            		ngay_mua as ngayMua,hd.thanh_tien as thanhTien,hd.trang_thai as trangThai,hd.loai_hoa_don AS loaiHD,
            		hdct.so_luong AS soLuongSP, ctsp.gia_ban AS giaBanSP, ha.ten AS tenHA,sp.ten AS tenSP, kt.ten AS tenKichThuoc,ms.ten AS tenMauSac,h.ten AS tenHang
             			 FROM  dbo.hoa_don hd
             			 JOIN nhan_vien nv ON nv.id = hd.nhan_vien_id
              		    LEFT JOIN khach_hang kh ON kh.id = hd.khach_hang_id			
             		    LEFT JOIN dbo.dia_chi dc ON dc.id = kh.dia_chi_id 
            			LEFT JOIN dbo.hoa_don_chi_tiet hdct ON hdct.hoa_don_id = hd.id
            			LEFT JOIN  dbo.chi_tiet_san_pham ctsp ON ctsp.id = hdct.chi_tiet_san_pham_id
            			LEFT JOIN dbo.hinh_anh ha ON ha.chi_tiet_san_pham_id = ctsp.id 
            			LEFT JOIN dbo.san_pham sp ON sp.id = ctsp.san_pham_id
            			LEFT JOIN dbo.kich_thuoc kt ON kt.id = ctsp.kich_thuoc_id
            			LEFT JOIN dbo.mau_sac ms ON ms.id = ctsp.mau_sac_id
            			LEFT JOIN dbo.hang h ON h.id = ctsp.hang_id WHERE hd.loai_hoa_don=1 AND hd.trang_thai=0
            """, nativeQuery = true)
	List<AdminBanHangHDRespon> HoaDonBanHang();

}

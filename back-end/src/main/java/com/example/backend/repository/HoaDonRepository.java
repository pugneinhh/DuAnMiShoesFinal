package com.example.backend.repository;


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
                   		 	LEFT JOIN duanmishoes.nguoi_dung kh ON kh.id = hd.khach_hang_id ORDER BY hd.ma DESC
                       """, nativeQuery = true)
	List<AdminHoaDonResponn> getALLHD();

	@Query(value = """
             SELECT hd.id AS idHD,  hd.ma AS ma, hd.nhan_vien_id as maNV, CASE WHEN hd.khach_hang_id IS NULL  THEN N'Khách lẻ'
                          ELSE kh.ten END  as tenKH ,
                   	CASE WHEN hd.khach_hang_id IS  NULL   THEN N''
                          ELSE kh.so_dien_thoai END  as sdt,
                               ngay_mua as ngayMua,thanh_tien as thanhTien,hd.trang_thai as trangThai,hd.loai_hoa_don AS loaiHD FROM duanmishoes.hoa_don hd
                   		 	LEFT JOIN duanmishoes.nguoi_dung kh ON kh.id = hd.khach_hang_id where hd.trang_thai=:tt ORDER BY hd.ma DESC
""",
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
     			LEFT JOIN duanmishoes.hang h ON h.id = ctsp.hang_id WHERE hdct.hoa_don_id='8e978627-be96-405d-9ae1-4ed8bb78ffc5'
                 	    """,
			nativeQuery = true)

	List<AdminHoaDonSanPham> detailHDSanPham(String key);
	// form bán hàng
	@Query(value = """  
//                    SELECT hd.ghi_chu AS ghiChuHD, hd.id AS idHD,hd.ma AS maHD, nv.ma AS maNV, CASE 
//                    WHEN hd.khach_hang_id IS NULL  THEN N'Khách lẻ'
//                    ELSE kh.ten END  as tenKH ,CASE WHEN hd.khach_hang_id IS  NULL   THEN N''
//                    ELSE kh.so_dien_thoai END  as sdt, 
//            		CASE WHEN hd.khach_hang_id IS  NULL THEN N''
//                    ELSE CONCAT(dc.dia_chi,' ' , dc.phuong,' ',dc.thanh_pho) END  as diaChiKH,
//            		ngay_mua as ngayMua,hd.thanh_tien as thanhTien,hd.trang_thai as trangThai,hd.loai_hoa_don AS loaiHD,
//            		hdct.so_luong AS soLuongSP, ctsp.gia_ban AS giaBanSP, ha.ten AS tenHA,sp.ten AS tenSP, kt.ten AS tenKichThuoc,ms.ten AS tenMauSac,h.ten AS tenHang
//             			 FROM  dbo.hoa_don hd
//             			 JOIN nhan_vien nv ON nv.id = hd.nhan_vien_id
//              		    LEFT JOIN khach_hang kh ON kh.id = hd.khach_hang_id			
//             		    LEFT JOIN dbo.dia_chi dc ON dc.id = kh.dia_chi_id 
//            			LEFT JOIN dbo.hoa_don_chi_tiet hdct ON hdct.hoa_don_id = hd.id
//            			LEFT JOIN  dbo.chi_tiet_san_pham ctsp ON ctsp.id = hdct.chi_tiet_san_pham_id
//            			LEFT JOIN dbo.hinh_anh ha ON ha.chi_tiet_san_pham_id = ctsp.id 
//            			LEFT JOIN dbo.san_pham sp ON sp.id = ctsp.san_pham_id
//            			LEFT JOIN dbo.kich_thuoc kt ON kt.id = ctsp.kich_thuoc_id
//            			LEFT JOIN dbo.mau_sac ms ON ms.id = ctsp.mau_sac_id
//            			LEFT JOIN dbo.hang h ON h.id = ctsp.hang_id WHERE hd.loai_hoa_don=1 AND hd.trang_thai=0
            """, nativeQuery = true)
	List<AdminBanHangHDRespon> HoaDonBanHang();

}

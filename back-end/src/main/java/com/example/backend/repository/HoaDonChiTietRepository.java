package com.example.backend.repository;

import com.example.backend.dto.response.HoaDonChiTietRespone;
import com.example.backend.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet, String> {
    @Query(value = "SELECT hoa_don_id as idHD,chi_tiet_san_pham_id as idCTSP,so_luong,gia_giam,gia_sau_giam,ngay_tao,ngay_sua,trang_thai FROM hoa_don_chi_tiet where hoa_don_id =:id ",nativeQuery = true)
    List<HoaDonChiTietRespone> getAllHDCTByHD(String id);
    List<HoaDonChiTiet> findHoaDonChiTietByHoaDon_Id(String id);
    @Query(value = "SELECT hoa_don_id as idHD,chi_tiet_san_pham_id as idCTSP,so_luong,gia_giam,gia_sau_giam,ngay_tao,ngay_sua,trang_thai FROM hoa_don_chi_tiet where hoa_don_id =:idHD and chi_tiet_san_pham_id =:idCTSP ",nativeQuery = true)
    HoaDonChiTietRespone getOneHDCT(@Param("idHD") String idHD,@Param("idCTSP")String idCTSP);

}

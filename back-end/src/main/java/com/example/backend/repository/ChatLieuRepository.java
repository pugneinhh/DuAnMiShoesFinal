package com.example.backend.repository;

import com.example.backend.model.AdminChatLieuRespon;
import com.example.backend.entity.ChatLieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatLieuRepository extends JpaRepository<ChatLieu, String> {
    @Query(value = """
    SELECT o.ma as ma ,o.ten as ten, o.trang_thai as trangThai FROM chat_lieu o ORDER BY o.ma ASC 
            """, nativeQuery = true)
    List<AdminChatLieuRespon> getALLCL();
}

package com.example.backend.service;
import com.example.backend.dto.request.ChatLieuRequest;
import com.example.backend.dto.response.ChatLieuRespone;
import com.example.backend.entity.ChatLieu;
import com.example.backend.repository.ChatLieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatLieuService {
    @Autowired
    ChatLieuRepository chatLieuRepository;

    public List<ChatLieu> getALL(){return chatLieuRepository.findAll();}
    public List<ChatLieuRespone> getALLCL(){
        return chatLieuRepository.getALLCL();
    }
    public String addCL(ChatLieuRequest cl){
        ChatLieu chatLieu = ChatLieu.builder()
                .ma(cl.getMa())
                .ten(cl.getTen())
                .ngayTao(cl.getNgayTao())
                .trangThai(1)
                .build();
        chatLieuRepository.save(chatLieu);
        return "Done";
    }
}

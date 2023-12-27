package com.example.backend.service;
import com.example.backend.model.AdminChatLieuRespon;
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
    public List<AdminChatLieuRespon> getALLCL(){
        return chatLieuRepository.getALLCL();
    }
    public ChatLieu addCL(ChatLieu cl){return chatLieuRepository.save(cl);}
}

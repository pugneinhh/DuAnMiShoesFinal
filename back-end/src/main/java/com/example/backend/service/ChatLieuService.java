package com.example.duanmishoes.service;

import com.example.duanmishoes.model.AdminChatLieuRespon;
import com.example.duanmishoes.entity.ChatLieu;
import com.example.duanmishoes.respon.ChatLieuRespon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatLieuService {
    @Autowired
    ChatLieuRespon chatLieuRespon;

    public List<ChatLieu> getALL(){return chatLieuRespon.findAll();}
    public List<AdminChatLieuRespon> getALLCL(){
        return chatLieuRespon.getALLCL();
    }
    public ChatLieu addCL(ChatLieu cl){return chatLieuRespon.save(cl);}
}

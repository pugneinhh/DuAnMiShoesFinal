package com.example.duanmishoes.model;

import org.springframework.beans.factory.annotation.Value;

public interface AdminHoaDonTimeLineRes {
    @Value("#{target.hdTimeLine}")
    String getHDTimeLine();
}

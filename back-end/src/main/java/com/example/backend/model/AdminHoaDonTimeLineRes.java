package com.example.backend.model;

import org.springframework.beans.factory.annotation.Value;

public interface AdminHoaDonTimeLineRes {
    @Value("#{target.hdTimeLine}")
    String getHDTimeLine();
}

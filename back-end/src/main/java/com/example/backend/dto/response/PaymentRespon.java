package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PaymentRespon implements Serializable {
    private String status;
    private String mess;
    private String URL;
}

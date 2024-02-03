package com.example.backend.dto.login;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginRespon {
    private String accessToken;
    private String tokenType = "Bearer";
    private String email;
    private String userID;

    public LoginRespon (String accessToken,String email) {
        this.accessToken = accessToken;
        this.email = email;
    }
}

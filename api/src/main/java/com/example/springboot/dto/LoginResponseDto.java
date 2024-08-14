package com.example.springboot.dto;

import com.example.springboot.models.UserModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto {
    private String token;
    private Object user;

    public LoginResponseDto(String token, Object user) {
        this.token = token;
        this.user = user;
    }
}
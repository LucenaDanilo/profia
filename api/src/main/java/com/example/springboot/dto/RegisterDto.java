package com.example.springboot.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDto {
    @NotEmpty
    private String name;

    @NotEmpty
    private String email;

    @NotEmpty
    private String password;

    @NotEmpty
    private String role;  // Espera-se que seja "ADMIN", "STUDENT" ou "TEACHER"



}

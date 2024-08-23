package com.example.springboot.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SelfStudentUpdateDto {
    private String name;
    private String email;
    private String password;  // Se quiser permitir a atualização da senha
    private String responsibleCPF;
    private LocalDate birthday;
}

package com.example.springboot.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class StudentUpdateDto {
    private String name;
    private String email;
    private String password;  // Se quiser permitir a atualização da senha
    private String responsibleCPF;
    private String registration;
    private LocalDate birthday;
    private int points;
}

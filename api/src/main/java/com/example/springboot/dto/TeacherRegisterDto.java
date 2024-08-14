package com.example.springboot.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TeacherRegisterDto extends RegisterDto {
    private String cnpj;
    private float hrAula;
    private String especialidade;

    // Getters and Setters

}


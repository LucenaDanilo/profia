package com.example.springboot.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class StudentRegisterDto extends RegisterDto {
    private String responsibleCPF;
    private String registration;
    private LocalDate birthday;
    private int points;

    // Getters and Setters

}


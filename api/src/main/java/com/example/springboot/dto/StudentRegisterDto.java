package com.example.springboot.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter

public class StudentRegisterDto {
    private String name;
    private String email;
    private String responsibleCPF;
    private String registration;
    private LocalDate birthday;
    private UUID turmaId;

    // Getters e Setters
}


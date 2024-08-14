package com.example.springboot.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class StudentDto extends UserDto {
    private String responsibleCPF;
    private String registration;
    private LocalDate birthday;
    private int points;
}

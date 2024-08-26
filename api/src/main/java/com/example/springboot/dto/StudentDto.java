package com.example.springboot.dto;

import com.example.springboot.models.TurmaModel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
public class StudentDto extends UserDto {
    private String responsibleCPF;
    private String registration;
    private LocalDate birthday;
    private int points;
    private UUID turmaId;

}

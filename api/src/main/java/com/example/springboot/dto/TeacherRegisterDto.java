package com.example.springboot.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
public class TeacherRegisterDto extends RegisterDto {
    private String cnpj;
    private float hrAula;
    private String especialidade;
    private Set<UUID> turmaIds; // IDs das turmas associadas

    // Getters and Setters
}

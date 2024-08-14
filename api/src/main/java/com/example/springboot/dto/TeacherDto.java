package com.example.springboot.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherDto extends UserDto {
    private String cnpj;
    private float hrAula;
    private String especialidade;
}
package com.example.springboot.dto;

import com.example.springboot.models.TurmaModel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
public class TeacherUpdateDto {
    private String name;
    private String email;
    private String password;  // Se quiser permitir a atualização da senha
    private String cnpj;
    private Float hrAula;
    private String especialidade;
    private Set<TurmaModel> turmas;
}

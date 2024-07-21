package com.example.springboot.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record TurmaRecordDto (@NotBlank String name, @NotBlank String trilha, @NotBlank String semester, int level,
                                    @NotNull LocalDate datainicio, @NotNull LocalDate datafim, @NotNull LocalTime horario) {

}

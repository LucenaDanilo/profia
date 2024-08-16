package com.example.springboot.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;
import java.util.UUID;

public record TurmaRecordDto(
        @NotBlank String name,
        @NotBlank String trilha,
        @NotBlank String semester,
        int level,
        @NotNull LocalDate datainicio,
        @NotNull LocalDate datafim,
        @NotNull LocalTime horario,
        @NotNull Set<UUID> teacherIds
) {
}

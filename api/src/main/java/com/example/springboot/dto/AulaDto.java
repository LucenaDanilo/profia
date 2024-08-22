package com.example.springboot.dto;

import com.example.springboot.models.TurmaModel;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record AulaDto (
        @NotNull String conteudo,
        @NotNull UUID turmaId,
        @NotNull UUID professorId,
        @NotNull List<UUID> studentIds,
        @NotNull LocalDate data,
        String linkAtividade
){
}

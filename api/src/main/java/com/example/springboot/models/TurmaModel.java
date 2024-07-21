package com.example.springboot.models;


import jakarta.persistence.*;
import org.springframework.hateoas.RepresentationModel;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "TB_TURMAS")
public class TurmaModel extends RepresentationModel<TurmaModel> implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID idProduct;
    private String name;
    private String trilha;
    private String semester;
    private int level;
    private LocalDate datainicio;
    private LocalDate datafim;
    private LocalTime horario;

    public UUID getIdTurma() {
        return idProduct;
    }

    public void setIdTurma(UUID idProduct) {
        this.idProduct = idProduct;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTrilha() {
        return trilha;
    }

    public void setTrilha(String trilha) {
        this.trilha = trilha;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public LocalDate getDatainicio() {
        return datainicio;
    }

    public void setDatainicio(LocalDate datainicio) {
        this.datainicio = datainicio;
    }

    public LocalDate getDatafim() {
        return datafim;
    }

    public void setDatafim(LocalDate datafim) {
        this.datafim = datafim;
    }

    public LocalTime getHorario() {
        return horario;
    }

    public void setHorario(LocalTime horario) {
        this.horario = horario;
    }
}

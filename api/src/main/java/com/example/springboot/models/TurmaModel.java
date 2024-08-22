package com.example.springboot.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

@Getter
@Setter
@Entity
public class TurmaModel extends RepresentationModel<TurmaModel> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;
    private String trilha;
    private String semester;
    private int level;
    private LocalDate datainicio;
    private LocalDate datafim;
    private LocalTime horario;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "turma_id")
    private Set<Aula> aulas = new HashSet<>();


    @ManyToMany
    @JoinTable(
            name = "turma_teachers",
            joinColumns = @JoinColumn(name = "turma_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id")
    )
    private Set<Teacher> teachers;

    @ManyToMany(mappedBy = "turmas")
    private Set<Student> students;



}

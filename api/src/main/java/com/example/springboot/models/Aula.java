package com.example.springboot.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;
@Getter
@Setter
@Entity
@Table(name = "TB_AULAS")
public class Aula extends RepresentationModel<Aula> implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String conteudo;
    private String linkAtividade;


    @ManyToOne
    @JoinColumn(name = "turma_id")
    @JsonBackReference
    private TurmaModel turma;

    @ManyToOne
    @JoinColumn(name = "professor_id")
    private Teacher professor;

    @ManyToMany
    @JsonIgnore
    private Set<Student> students;

    private LocalDate data;


}

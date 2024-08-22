package com.example.springboot.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
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
    @JoinTable(
            name = "aula_student",
            joinColumns = @JoinColumn(name = "aula_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<Student> students;

    private LocalDate data;


}

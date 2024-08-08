package com.example.springboot.models;

import jakarta.persistence.*;
import org.springframework.hateoas.RepresentationModel;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "TB_AULAS")
public class Aula extends RepresentationModel<Aula> implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID idProduct;

    private String conteudo;

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

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public Teacher getProfessor() {
        return professor;
    }

    public void setProfessor(Teacher professor) {
        this.professor = professor;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public UUID getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(UUID idProduct) {
        this.idProduct = idProduct;
    }
}

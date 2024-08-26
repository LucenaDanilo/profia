package com.example.springboot.models;

import com.example.springboot.models.TurmaModel;
import com.example.springboot.models.UserModel;
import com.example.springboot.utils.CPFUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "students")
public class Student extends UserModel {

    private String responsibleCPF;
    @Setter
    private String registration;


    @Getter
    @Setter
    private Float presenca = 0.0f;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private LocalDate birthday;

    private int points;

    @Getter
    @Setter
    @ManyToMany(mappedBy = "students")
//    @JsonIgnore
    private List<Aula> aulas;


    @Getter
    @Setter
    @ManyToMany
    @JoinTable(
            name = "student_products",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    @JsonIgnore
    private Set<ProductModel> produtosResgatados = new HashSet<>();


    @Getter
    @Setter
    @ManyToMany
    @JoinTable(
            name = "turma_students",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "turma_id")
    )
    @JsonIgnore
    private Set<TurmaModel> turmas = new HashSet<>();

    public Student(String name, String password, String email, String responsibleCPF, String registration, LocalDate birthday) {
        super(name, email, password, "ROLE_STUDENT");
        this.responsibleCPF = responsibleCPF;
        this.registration = registration;
        this.birthday = birthday;
        this.points = 0;
        this.presenca = 0.0f;
    }

    public Student() {
        super();
        this.turmas = new HashSet<>();
        this.presenca = 0.0f;
    }

    public String getResponsibleCPF() {
        return responsibleCPF;
    }

    public void setResponsibleCPF(String responsibleCPF) {
        if (CPFUtils.isValidCPF(responsibleCPF)) {
            this.responsibleCPF = responsibleCPF;
        } else {
            throw new IllegalArgumentException("Invalid CPF");
        }
    }

    public String getRegistration() {
        return registration;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        if (birthday != null && birthday.isBefore(LocalDate.now())) {
            this.birthday = birthday;
        } else {
            throw new IllegalArgumentException("Birthdate must be before the current date.");
        }
    }

    public int getAge() {
        if (birthday == null) {
            return 0; // or any other value indicating "unknown"
        }
        return Period.between(birthday, LocalDate.now()).getYears();
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        if (points >= 0) {
            this.points = points;
        } else {
            throw new IllegalArgumentException("Points must be equal to or greater than 0.");
        }
    }

    public Set<TurmaModel> getTurmas() {
        return turmas;
    }

    public void setTurmas(Set<TurmaModel> turmas) {
        this.turmas = turmas;
    }
}

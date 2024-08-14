package com.example.springboot.models;

import com.example.springboot.enums.UserRole;
import com.example.springboot.utils.CPFUtils;
import jakarta.persistence.*;
import lombok.Setter;

import java.time.LocalDate;
import java.time.Period;
import java.util.UUID;

@Entity
@Table(name = "students")
public class Student extends UserModel {


    private String responsibleCPF;
    @Setter
    private String registration;
    private LocalDate birthday;
    private int points;

    public Student(String name,String password, String email, String responsibleCPF, String registration, LocalDate birthday) {
        super(name,email, password, "ROLE_STUDENT");
        this.responsibleCPF = responsibleCPF;
        this.registration = registration;
        this.birthday = birthday;
        this.points = 0;
    }

    public Student() {
        super();
        // Construtor padrão necessário para JPA
    }

    public String getResponsibleCPF() {
        return responsibleCPF;
    }

    public void setResponsibleCPF(String responsibleCPF) {
        if (CPFUtils.isValidCPF(responsibleCPF)) {
            this.responsibleCPF = responsibleCPF;
        } else {
            throw new IllegalArgumentException("CPF inválido");
        }
    }

    public String getRegistration() {
        return registration;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public int getAge() {
        if (birthday == null) {
            throw new IllegalStateException("A data de nascimento não foi definida.");
        }
        return Period.between(birthday, LocalDate.now()).getYears();
    }

    public void setBirthday(LocalDate birthday) {
        if (birthday != null && birthday.isBefore(LocalDate.now())) {
            this.birthday = birthday;
        } else {
            throw new IllegalArgumentException("A data de nascimento deve ser anterior à data atual.");
        }
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        if (points >= 0) {
            this.points = points;
        } else {
            throw new IllegalArgumentException("Os pontos devem ser igual ou iguais a 0");
        }
    }
}

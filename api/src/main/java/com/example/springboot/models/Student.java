package com.example.springboot.models;

import com.example.springboot.utils.CPFUtils;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.Period;
import java.util.UUID;

@Entity
public class Student extends User {


    private String responsibleCPF;
    private String registration;
    private LocalDate birthday;
    private int points;

    public Student(String username, String password, String email, String responsibleCPF, String registration, LocalDate birthday, int points) {
        super(username, password, email, "Student");
        this.responsibleCPF = responsibleCPF;
        this.registration = registration;
        this.birthday = birthday;
        this.points = points;
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

    public void setRegistration(String registration) {
        this.registration = registration;
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

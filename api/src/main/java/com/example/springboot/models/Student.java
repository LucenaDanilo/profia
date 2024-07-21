package com.example.springboot.models;


import com.example.springboot.utils.CPFUtils;
import jakarta.persistence.Entity;

@Entity
public class Student extends User {

    private String responsibleCPF;
    private String registration;
    private int age;
    private int points;

    public Student(String username, String password, String email, String responsibleCPF, String registration, int age, int points) {
        super(username, password, email, "Student");
        this.responsibleCPF = responsibleCPF;
        this.registration = registration;
        this.age = age;
        this.points = points;
    }

    public Student() {
        super("", "", "", "Student");
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age > 0 && age <= 100) {
            this.age = age;
        } else throw new IllegalArgumentException("Idade deve ser maior que 0 e menor que 100");
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        if (points >= 0) {
            this.points = points;
        } else throw new IllegalArgumentException("Os pontos devem ser igual ou iguais a 0");
    }
}

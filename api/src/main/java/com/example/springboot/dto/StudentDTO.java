package com.example.springboot.dto;

import java.time.LocalDate;
import java.time.Period;

public class StudentDTO {

    private String username;
    private String password;
    private String email;
    private String responsibleCPF;
    private String registration;
    private LocalDate birthday;
    private int points;

    // Construtores, getters e setters
    public StudentDTO() {
    }

    public StudentDTO(String username, String password, String email, String responsibleCPF, String registration, LocalDate birthday, int points) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.responsibleCPF = responsibleCPF;
        this.registration = registration;
        this.birthday = birthday;
        this.points = points;
    }

    // Getters e setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getResponsibleCPF() {
        return responsibleCPF;
    }

    public void setResponsibleCPF(String responsibleCPF) {
        this.responsibleCPF = responsibleCPF;
    }

    public String getRegistration() {
        return registration;
    }

    public void setRegistration(String registration) {
        this.registration = registration;
    }



    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public LocalDate getBirthday(){return this.birthday;}

    public int getAge() {
        if (birthday == null) {
            throw new IllegalStateException("A data de nascimento não foi definida.");
        }
        return Period.between(birthday, LocalDate.now()).getYears();
    }
}

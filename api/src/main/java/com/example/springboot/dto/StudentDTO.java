package com.example.springboot.dto;

public class StudentDTO {

    private String username;
    private String password;
    private String email;
    private String responsibleCPF;
    private String registration;
    private int age;
    private int points;

    // Construtores, getters e setters
    public StudentDTO() {
    }

    public StudentDTO(String username, String password, String email, String responsibleCPF, String registration, int age, int points) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.responsibleCPF = responsibleCPF;
        this.registration = registration;
        this.age = age;
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}

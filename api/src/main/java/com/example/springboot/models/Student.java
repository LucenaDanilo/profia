package com.example.springboot.models;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "students_table")
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
}

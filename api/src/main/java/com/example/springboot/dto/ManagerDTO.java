package com.example.springboot.dto;

import com.example.springboot.models.Manager;

public class ManagerDTO {

    private String username;
    private String password;
    private String email;

    // Construtores, getters e setters
    public ManagerDTO() {
    }

    public ManagerDTO(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public ManagerDTO(Manager manager) {
        this.username = manager.getUsername();
        this.password = manager.getPassword();
        this.email = manager.getEmail(); // Adicione o email aqui
    }



    // Getters e setters
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}

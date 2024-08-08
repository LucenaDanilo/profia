package com.example.springboot.models;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class Manager extends User {

    @Column(name = "is_superuser")
    private boolean isSuperuser;

    public Manager() {
        super();
        // Construtor padrão necessário para JPA
    }

    public Manager(String username, String password, String email) {
        super(username, password, email, "Manager");
        this.isSuperuser = true;
    }

    public Manager(Manager manager) {
        super(manager.getUsername(),manager.getPassword(),manager.getEmail(),"Manager");

    }

    public boolean isSuperuser() {
        return isSuperuser;
    }

    public void setSuperuser(boolean isSuperuser) {
        this.isSuperuser = isSuperuser;
    }
}

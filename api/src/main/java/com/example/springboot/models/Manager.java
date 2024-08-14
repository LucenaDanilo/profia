package com.example.springboot.models;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class Manager extends UserModel {

    @Column(name = "is_superuser")
    private boolean isSuperuser;

    public Manager() {
        super();
        // Construtor padrão necessário para JPA
    }

    public Manager(String name, String email,String password) {
        super(name,email, password, "ROLE_MANAGER");
        this.isSuperuser = true;
    }

    public Manager(Manager manager) {
        super(manager.getName(),manager.getPassword(),manager.getEmail(),"ROLE_MANAGER");

    }

    public boolean isSuperuser() {
        return isSuperuser;
    }

    public void setSuperuser(boolean isSuperuser) {
        this.isSuperuser = isSuperuser;
    }
}

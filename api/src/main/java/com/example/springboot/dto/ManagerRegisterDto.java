package com.example.springboot.dto;

import com.example.springboot.models.Manager;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ManagerRegisterDto extends RegisterDto {

    // Construtor que aceita um objeto Manager
    public ManagerRegisterDto(Manager manager) {
        this.setName(manager.getName());
        this.setEmail(manager.getEmail());
        this.setPassword(manager.getPassword());  // Cuidado: Não é recomendável retornar a senha
        this.setRole(manager.getUserRole());  // Certifique-se de que Manager tem getUserRole()
    }

    public ManagerRegisterDto() {
        // Construtor padrão
    }
}
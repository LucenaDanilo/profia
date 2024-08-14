package com.example.springboot.models;

import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
@Entity
public class Teacher extends UserModel {
    private static final long serialVersionUID = 1L;

    private String cnpj;
    private float hrAula;
    private String especialidade;

    public Teacher(String username, String password, String email, String cnpj, float hrAula, String especialidade) {
        super(username, password, email, "ROLE_TEACHER");
        this.cnpj = cnpj;
        this.hrAula = hrAula;
        this.especialidade = especialidade;
    }
    public Teacher() {
        super();
        // Construtor padrão necessário para JPA
    }


    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public float getHrAula() {
        return hrAula;
    }

    public void setHrAula(float hrAula) {
        this.hrAula = hrAula;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }
}

package com.example.springboot.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Teacher extends UserModel {
    private static final long serialVersionUID = 1L;

    private String cnpj;
    private float hrAula;
    private String especialidade;

    @ManyToMany(mappedBy = "teachers")
    @JsonIgnore
    private Set<TurmaModel> turmas;

    public Teacher(String name, String password, String email, String cnpj, float hrAula, String especialidade) {
        super(name, email, password, "ROLE_TEACHER");
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

    public Set<TurmaModel> getTurmas() {
        return turmas;
    }

    public void setTurmas(Set<TurmaModel> turmas) {
        this.turmas = turmas;
    }
}

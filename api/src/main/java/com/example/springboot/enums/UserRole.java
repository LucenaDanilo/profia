package com.example.springboot.enums;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;

@Getter
public enum UserRole {
    ADMIN("admin"),
    STUDENT("student"),
    TEACHER("teacher");

    private final String role;

    UserRole(String role) {
        this.role = role;
    }

}

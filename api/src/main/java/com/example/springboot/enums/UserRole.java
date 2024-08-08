package com.example.springboot.enums;

public enum UserRole {
    ADMIN("admin"),
    USER("user"),
    TEACHER("teacher");

    private final String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}

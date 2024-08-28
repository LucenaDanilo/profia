package com.example.springboot.models;

import com.example.springboot.dto.RegisterDto;
import com.example.springboot.dto.StudentRegisterDto;
import com.example.springboot.enums.UserRole;

import com.example.springboot.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.UUID;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import jakarta.persistence.*;



@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserModel implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String name;
    private String email;
    private String password;

    @Setter
    @Getter
    private String userRole;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDate createdAt;

    @Column(name = "updated_at", nullable = true)
    private LocalDate updatedAt;

    public UserModel(String name, String email, String password, String userRole) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.userRole = userRole;
        this.createdAt = LocalDate.now(); // Define createdAt no momento da criação do objeto
    }

//    // Método para registrar um novo usuário
//    public UserModel register(StudentRegisterDto registerDto) {
//        UserModel user = new UserModel(
//                registerDto.getName(),
//                registerDto.getPassword(),
//                registerDto.getEmail(),
//                registerDto.getResponsibleCPF(),
//                registerDto.getRegistration(),
//                registerDto.getBirthday()
//        );
//        // Aqui deveria estar o userRepository.save(user);, mas o repositório não está injetado
//        return user;
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        System.out.println("Role assigned: " + userRole);
        System.out.println(this.email);
        if ("ROLE_ADMIN".equals(userRole)) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_STUDENT"),
                    new SimpleGrantedAuthority("ROLE_TEACHER"));
        } else if ("ROLE_STUDENT".equals(userRole)) {
            return List.of(new SimpleGrantedAuthority("ROLE_STUDENT"));
        } else {
            return List.of(new SimpleGrantedAuthority("ROLE_TEACHER"));
        }
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

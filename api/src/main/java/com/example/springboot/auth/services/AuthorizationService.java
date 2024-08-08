package com.example.springboot.auth.services;

import java.sql.Date;

import com.example.springboot.security.TokenService;
import com.example.springboot.dto.AuthetinticationDto;
import com.example.springboot.dto.LoginResponseDto;
import com.example.springboot.dto.RegisterDto;
import com.example.springboot.enums.UserRole;
import com.example.springboot.models.UserModel;
import com.example.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


import jakarta.validation.Valid;

@Service
public class AuthorizationService implements UserDetailsService{
    @Autowired
    private ApplicationContext context;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    private AuthenticationManager authenticationManager;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    }

    public ResponseEntity<Object> login(@RequestBody @Valid AuthetinticationDto data){
        authenticationManager = context.getBean(AuthenticationManager.class);

        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((UserModel) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDto(token));
    }


    public ResponseEntity<Object> register(RegisterDto registerDto) {
        if (userRepository.findByEmail(registerDto.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        // Converta a string para o enum UserRole
        UserRole role;
        try {
            role = UserRole.valueOf(registerDto.getRole());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid user role");
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDto.getPassword());
        UserModel newUser = new UserModel(registerDto.getEmail(), encryptedPassword, role);
        newUser.setCreatedAt(new Date(System.currentTimeMillis()));
        userRepository.save(newUser);
        return ResponseEntity.ok().build();
    }




}


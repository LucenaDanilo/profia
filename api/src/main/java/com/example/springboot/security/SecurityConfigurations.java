package com.example.springboot.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        // Permitir acesso público para login
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()

                        // Permitir acesso para registro apenas para ADMIN
                        .requestMatchers("/auth/register").hasAuthority("ROLE_ADMIN")

                        // Permitir acesso para resgatar produtos apenas para STUDENT
                        .requestMatchers(HttpMethod.POST, "/products/resgatar").hasAuthority("ROLE_STUDENT")
                        .requestMatchers(HttpMethod.POST, "/products/resgatar").hasAuthority("ROLE_STUDENT")

                        // Permitir acesso a estudantes e professores para /api/students/** e /api/teachers/**
                        .requestMatchers("/api/students/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER")
                        .requestMatchers("/api/teachers/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER")

                        // Permitir GET para produtos apenas para STUDENT
                        .requestMatchers(HttpMethod.GET, "/products/**").hasAuthority("ROLE_STUDENT")
                        // Minha turma (aluno)
                        .requestMatchers(HttpMethod.GET, "/turma/**").hasAnyAuthority("ROLE_STUDENT", "ROLE_TEACHER")


                        // Permitir acesso completo para produtos apenas para ADMIN
                        .requestMatchers("/products/**").hasAuthority("ROLE_ADMIN")

                        // Requer autenticação para todas as outras requisições
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
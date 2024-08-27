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
                        // Allow OPTIONS requests to pass through for CORS preflight checks
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Allow self-update for students
                        .requestMatchers(HttpMethod.PUT, "/students/myprofile/**").hasAnyAuthority("ROLE_STUDENT")

                        // Allow public access for login
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()

                        // Allow access to registration only for ADMIN
                        .requestMatchers("/auth/register").hasAuthority("ROLE_ADMIN")

                        // Allow access to redeem products only for STUDENT
                        .requestMatchers(HttpMethod.POST, "/products/resgatar").hasAuthority("ROLE_STUDENT")

                        // Allow access for admins and teachers to /api/students/** and /api/teachers/**
                        .requestMatchers("/students/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER")
                        .requestMatchers("/teachers/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER")

                        // Allow admin access (admin token) to student detail page
                        .requestMatchers(HttpMethod.GET, "/students/**").hasAnyAuthority("ROLE_ADMIN","ROLE_TEACHER")
                        .requestMatchers(HttpMethod.POST, "/students/**").hasAnyAuthority("ROLE_ADMIN","ROLE_TEACHER")
                        .requestMatchers(HttpMethod.PUT, "/students/**").hasAnyAuthority("ROLE_ADMIN","ROLE_TEACHER")
                        .requestMatchers(HttpMethod.DELETE, "/students/**").hasAnyAuthority("ROLE_ADMIN","ROLE_TEACHER")

                        .requestMatchers("/aula/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER")

                        // Allow GET access to products only for STUDENT
                        .requestMatchers(HttpMethod.GET, "/products/**").hasAuthority("ROLE_STUDENT")
                        .requestMatchers(HttpMethod.GET, "/students/**").hasAuthority("ROLE_STUDENT")

                        // Allow "Minha turma" access for students and teachers
                        .requestMatchers(HttpMethod.GET, "/turma/**").hasAnyAuthority("ROLE_STUDENT", "ROLE_TEACHER")
                        .requestMatchers(HttpMethod.GET, "/myclassrooms").hasAnyAuthority("ROLE_STUDENT", "ROLE_TEACHER")

                        // Allow full access to products only for ADMIN
                        .requestMatchers("/products/**").hasAuthority("ROLE_ADMIN")
                        // Verificar isso posteriormente
                        .requestMatchers("/products/**").hasAuthority("ROLE_STUDENT")
                        // Require authentication for all other requests
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

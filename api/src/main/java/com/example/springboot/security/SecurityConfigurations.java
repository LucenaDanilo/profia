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
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Autowired
    private SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        // Permitir requisições OPTIONS (pre-flight CORS)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Acesso público para login
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()

                        // Acesso ao registro de usuários apenas para ADMIN
                        .requestMatchers("/auth/register").hasAuthority("ROLE_ADMIN")

                        // Permitir "resgatar produtos" apenas para alunos
                        .requestMatchers(HttpMethod.POST, "/products/resgatar").hasAuthority("ROLE_STUDENT")

                        // Controle de acesso para alunos e professores
                        .requestMatchers("/students/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER")
                        .requestMatchers("/teachers/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER")

                        // Permitir GET em produtos para alunos
                        .requestMatchers(HttpMethod.GET, "/products/**").hasAuthority("ROLE_STUDENT")

                        // "Minha turma" acessível para alunos e professores
                        .requestMatchers(HttpMethod.GET, "/turma/**").hasAnyAuthority("ROLE_STUDENT", "ROLE_TEACHER")
                        .requestMatchers(HttpMethod.GET, "/myclassrooms").hasAnyAuthority("ROLE_STUDENT", "ROLE_TEACHER")

                        // Permitir CRUD completo de produtos para ADMIN
                        .requestMatchers("/products/**").hasAuthority("ROLE_ADMIN")

                        // Exigir autenticação para qualquer outra requisição
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
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configuração global de CORS
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*") // Modifique para seu domínio se necessário
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}

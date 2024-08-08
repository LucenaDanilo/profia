package com.example.springboot.security;

import com.example.springboot.user.enums.UserRole;
import com.example.springboot.user.models.UserModel;
import com.example.springboot.user.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;

@Configuration
public class DataInitializer {

    @Autowired
    private UserRepository userRepository;

    @Bean
    public CommandLineRunner initializeData() {
        return args -> {
            if (userRepository.count() == 0) {
                String encryptedPassword = new BCryptPasswordEncoder().encode("admin_password");

                UserModel adminUser = new UserModel("admin@exemplo.com", encryptedPassword, UserRole.ADMIN);
                adminUser.setCreatedAt(new Date(System.currentTimeMillis()));
                userRepository.save(adminUser);

                // Adicione um log para verificar a criação
                System.out.println("Admin user created: " + adminUser);
            } else {
                System.out.println("User table already populated.");
            }
        };
    }
}

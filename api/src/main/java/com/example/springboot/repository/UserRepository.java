package com.example.springboot.repository;

import java.util.Optional;
import java.util.UUID;

import com.example.springboot.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;




public interface UserRepository extends JpaRepository<UserModel, UUID>{
    UserDetails findByEmail(String email);
}

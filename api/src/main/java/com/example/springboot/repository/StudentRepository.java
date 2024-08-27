package com.example.springboot.repository;

import com.example.springboot.models.Student;
import com.example.springboot.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface StudentRepository extends JpaRepository<Student, UUID> {
    @Override
    Optional<Student> findById(UUID uuid);
    Optional<Student> findByEmail(String email);
}

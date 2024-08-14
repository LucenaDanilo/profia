package com.example.springboot.repository;

import com.example.springboot.models.Student;
import com.example.springboot.models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface TeacherRepository extends JpaRepository<Teacher, UUID> {
    @Override
    Optional<Teacher> findById(UUID uuid);
    UserDetails findByEmail(String email);
}

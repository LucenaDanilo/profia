package com.example.springboot.repository;

import com.example.springboot.models.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long> {
    Manager findByEmail(String email);

    Optional<Manager> findById(UUID id);

    boolean existsById(UUID id);

    void deleteById(UUID id);
}

package com.example.springboot.repository;

import com.example.springboot.models.Aula;
import com.example.springboot.models.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AulaRepository extends JpaRepository<Aula,UUID> {

    Optional<Aula> findById(UUID uuid);

    boolean existsById(UUID id);

    void deleteById(UUID id);
}

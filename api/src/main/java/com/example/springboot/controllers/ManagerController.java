package com.example.springboot.controllers;

import com.example.springboot.dto.ManagerDTO;
import com.example.springboot.models.Manager;
import com.example.springboot.repository.ManagerRepository;

import com.example.springboot.services.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/managers")
public class ManagerController {


    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private ManagerService managerService;

    @PostMapping("/save")
    public ManagerDTO save(@RequestBody ManagerDTO managerDTO) {
        return managerService.save(managerDTO);
    }

    @GetMapping
    public ResponseEntity<List<Manager>> getAllManagers() {
        List<Manager> managers = managerRepository.findAll();
        return ResponseEntity.ok(managers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Manager> getManagerById(@PathVariable UUID id) {
        Optional<Manager> manager = managerRepository.findById(id);
        return manager.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }



    @PutMapping("/{id}")
    public ResponseEntity<Manager> updateManager(@PathVariable UUID id, @RequestBody ManagerDTO managerDTO) {
        Optional<Manager> existingManagerOptional = managerRepository.findById(id);
        if (existingManagerOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Manager existingManager = existingManagerOptional.get();
        existingManager.setUsername(managerDTO.getUsername());
        existingManager.setPassword(managerDTO.getPassword());
        existingManager.setEmail(managerDTO.getEmail());

        Manager updatedManager = managerRepository.save(existingManager);
        return ResponseEntity.ok(updatedManager);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteManager(@PathVariable UUID id) {
        if (!managerRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        managerRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

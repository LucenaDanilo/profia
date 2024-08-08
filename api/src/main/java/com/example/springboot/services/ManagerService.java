package com.example.springboot.services;

import com.example.springboot.dto.ManagerDTO;
import com.example.springboot.models.Manager;
import com.example.springboot.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ManagerService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ManagerRepository managerRepository;

    public ManagerDTO save(ManagerDTO managerDTO) {
        Manager entity = new Manager();
        entity.setUsername(managerDTO.getUsername());
        entity.setPassword(passwordEncoder.encode(managerDTO.getPassword()));
        Manager savedEntity = managerRepository.save(entity);
        return new ManagerDTO(savedEntity);
    }
}

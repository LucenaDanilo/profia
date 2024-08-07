package com.example.springboot.security;

import com.example.springboot.dto.ManagerDTO;
import com.example.springboot.models.Manager;
import com.example.springboot.repository.ManagerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Manager user = managerRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    @Transactional
    public ManagerDTO save(ManagerDTO managerDTO) {
        Manager entity = new Manager();
        entity.setUsername(managerDTO.getUsername());
        entity.setPassword(passwordEncoder.encode(managerDTO.getPassword()));
        Manager savedEntity = managerRepository.save(entity);
        return new ManagerDTO(savedEntity); // Corrigido para retornar um DTO
    }

}

package com.example.springboot.controllers;

import com.example.springboot.models.User;
import com.example.springboot.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Get all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    // Create a new user
    @PostMapping("/users")
    public ResponseEntity<User> saveProduct(@RequestBody @Valid User user) {
        var UserModel = new User();
        BeanUtils.copyProperties(user, UserModel);
        return (ResponseEntity<User>) ResponseEntity.status(HttpStatus.CREATED);
    }

    // Get a user by ID
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable UUID id) {
        return userRepository.findById(id)
                .map(user -> ResponseEntity.ok().body(user))
                .orElse(ResponseEntity.notFound().build());
    }
}

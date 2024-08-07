package com.example.springboot.security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("private")
public class PrivateController {
    @GetMapping
    public String getMessage(){
        return "Hello from the private api";
    }
}
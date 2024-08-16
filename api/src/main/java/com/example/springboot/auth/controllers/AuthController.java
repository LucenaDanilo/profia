package com.example.springboot.auth.controllers;

import com.example.springboot.auth.services.AuthorizationService;
import com.example.springboot.dto.AuthetinticationDto;
import com.example.springboot.dto.ManagerRegisterDto;
import com.example.springboot.dto.StudentRegisterDto;
import com.example.springboot.dto.TeacherRegisterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
public class AuthController {

    @Autowired
    AuthorizationService authorizationService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody @Valid AuthetinticationDto authenticationDto){
        return authorizationService.login(authenticationDto);
    }



    @PostMapping("/student/register")
    public ResponseEntity<Object> Studentregister(@RequestBody StudentRegisterDto studentregisterDto) {
        return authorizationService.studentRegister(studentregisterDto);
    }

    @PostMapping("/teacher/register")
    public ResponseEntity<Object> Teacherregister(@RequestBody TeacherRegisterDto teacherRegisterDto) {
        return authorizationService.teacherRegister(teacherRegisterDto);
    }

    @PostMapping("/manager/register")
    public ResponseEntity<Object> Managerregister(@RequestBody ManagerRegisterDto managerRegisterDto) {
        return authorizationService.managerRegister(managerRegisterDto);
    }
}

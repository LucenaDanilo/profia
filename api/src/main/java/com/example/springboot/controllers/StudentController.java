package com.example.springboot.controllers;


import com.example.springboot.dto.PointsDto;
import com.example.springboot.dto.StudentUpdateDto;
import com.example.springboot.models.Student;
import com.example.springboot.repository.StudentRepository;
import com.example.springboot.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private StudentService studentService;

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable UUID id) {
        Optional<Student> student = studentRepository.findById(id);
        return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }



    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable UUID id, @RequestBody StudentUpdateDto studentUpdateDto) {
        Student updatedStudent = studentService.update(id, studentUpdateDto);
        return ResponseEntity.ok(updatedStudent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable UUID id) {
        if (!studentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        studentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/coins")
    public ResponseEntity<String> atribuirPontos(@RequestBody PointsDto pointsDto ){
        UUID studentId = pointsDto.getStudentId();
        int points = pointsDto.getPoints();

        studentService.atribuirPontos(studentId,points);
        return ResponseEntity.ok().body("Pontos atribuidos com sucesso");
    }





}

package com.example.springboot.controllers;


import com.example.springboot.dto.StudentUpdateDto;
import com.example.springboot.dto.TeacherUpdateDto;
import com.example.springboot.models.Student;
import com.example.springboot.models.Teacher;
import com.example.springboot.repository.StudentRepository;
import com.example.springboot.repository.TeacherRepository;
import com.example.springboot.services.StudentService;
import com.example.springboot.services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/teachers")
@CrossOrigin(origins = "*")
public class TeacherController {

    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private TeacherService teacherService;

    @GetMapping
    public ResponseEntity<List<Teacher>> getAllTeachers() {
        List<Teacher> teachers = teacherRepository.findAll();
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable UUID id) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        return teacher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }



    @PutMapping("/{id}")
    public ResponseEntity<Teacher> updateTeacher(@PathVariable UUID id, @RequestBody TeacherUpdateDto teacherUpdateDto) {
        Teacher updatedTeacher = teacherService.update(id, teacherUpdateDto);
        return ResponseEntity.ok(updatedTeacher);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable UUID id) {
        if (!teacherRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        teacherRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


//    @PostMapping("/matricular")
//    public ResponseEntity<String> matricular(@RequestParam UUID studentId, @RequestParam UUID turmaId) {
//        try {
//            studentService.matricular(studentId, turmaId);
//            return ResponseEntity.ok("Student matriculated successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error matriculating student: " + e.getMessage());
//        }
//    }
}
package com.example.springboot.controllers;

import com.example.springboot.dto.StudentDTO;
import com.example.springboot.models.Student;
import com.example.springboot.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

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

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody StudentDTO studentDTO) {
        Student student = new Student(studentDTO.getUsername(), studentDTO.getPassword(), studentDTO.getEmail(), studentDTO.getResponsibleCPF(), studentDTO.getRegistration(), studentDTO.getAge(), studentDTO.getPoints());
        Student savedStudent = studentRepository.save(student);
        return ResponseEntity.ok(savedStudent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable UUID id, @RequestBody StudentDTO studentDTO) {
        Optional<Student> existingStudentOptional = studentRepository.findById(id);
        if (!existingStudentOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Student existingStudent = existingStudentOptional.get();
        existingStudent.setUsername(studentDTO.getUsername());
        existingStudent.setPassword(studentDTO.getPassword());
        existingStudent.setEmail(studentDTO.getEmail());
        existingStudent.setResponsibleCPF(studentDTO.getResponsibleCPF());
        existingStudent.setRegistration(studentDTO.getRegistration());
        existingStudent.setAge(studentDTO.getAge());
        existingStudent.setPoints(studentDTO.getPoints());

        Student updatedStudent = studentRepository.save(existingStudent);
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
}

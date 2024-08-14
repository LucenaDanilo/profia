package com.example.springboot.services;

import com.example.springboot.dto.StudentUpdateDto;
import com.example.springboot.models.Student;
import com.example.springboot.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Student update(UUID studentId, StudentUpdateDto updateDto) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);

        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();

            // Atualizar os campos do estudante
            if (updateDto.getName() != null) {
                student.setName(updateDto.getName());
            }
            if (updateDto.getEmail() != null) {
                student.setEmail(updateDto.getEmail());
            }
            if (updateDto.getPassword() != null) {
                student.setPassword(passwordEncoder.encode(updateDto.getPassword()));
            }
            if (updateDto.getResponsibleCPF() != null) {
                student.setResponsibleCPF(updateDto.getResponsibleCPF());
            }
            if (updateDto.getRegistration() != null) {
                student.setRegistration(updateDto.getRegistration());
            }
            if (updateDto.getBirthday() != null) {
                student.setBirthday(updateDto.getBirthday());
            }
            if (updateDto.getPoints() != 0) {
                student.setPoints(updateDto.getPoints());
            }

            return studentRepository.save(student);
        } else {
            throw new RuntimeException("Student not found");
        }
    }
}

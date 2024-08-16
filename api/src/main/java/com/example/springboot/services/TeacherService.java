package com.example.springboot.services;

import com.example.springboot.dto.StudentUpdateDto;
import com.example.springboot.dto.TeacherUpdateDto;
import com.example.springboot.models.Student;
import com.example.springboot.models.Teacher;
import com.example.springboot.models.TurmaModel;
import com.example.springboot.repository.StudentRepository;
import com.example.springboot.repository.TeacherRepository;
import com.example.springboot.repository.TurmaRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Teacher update(UUID teacherId, TeacherUpdateDto updateDto) {
        Optional<Teacher> teacherOptional = teacherRepository.findById(teacherId);

        if (teacherOptional.isPresent()) {
            Teacher teacher = teacherOptional.get();

            // Atualizar os campos do professor
            if (updateDto.getName() != null) {
                teacher.setName(updateDto.getName());
            }
            if (updateDto.getEmail() != null) {
                teacher.setEmail(updateDto.getEmail());
            }
            if (updateDto.getPassword() != null) {
                teacher.setPassword(passwordEncoder.encode(updateDto.getPassword()));
            }
            if (updateDto.getCnpj() != null) {
                teacher.setCnpj(updateDto.getCnpj());
            }
            if (updateDto.getEspecialidade() != null) {
                teacher.setEspecialidade(updateDto.getEspecialidade());
            }
            if (updateDto.getHrAula() != null) {
                teacher.setHrAula(updateDto.getHrAula());
            }
            if (updateDto.getTurmas() != null) {
                teacher.setTurmas(updateDto.getTurmas());
            }


            return teacherRepository.save(teacher);
        } else {
            throw new RuntimeException("Teacher not found");
        }
    }



}

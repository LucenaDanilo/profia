package com.example.springboot.services;

import com.example.springboot.dto.StudentUpdateDto;
import com.example.springboot.models.Student;
import com.example.springboot.models.TurmaModel;
import com.example.springboot.repository.StudentRepository;
import com.example.springboot.repository.TurmaRepository;
import jakarta.transaction.Transactional;
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
    private TurmaRepository turmaRepository;

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

    @Transactional
    public Student matricularAluno(UUID studentId, UUID turmaId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        Optional<TurmaModel> turmaOpt = turmaRepository.findById(turmaId);

        if (studentOpt.isPresent() && turmaOpt.isPresent()) {
            Student student = studentOpt.get();
            TurmaModel turma = turmaOpt.get();

            // Adiciona o aluno à turma e a turma ao aluno
            turma.getStudents().add(student);  // Certifique-se de que turma.getStudents() não é null
            student.getTurmas().add(turma);    // Certifique-se de que student.getTurmas() não é null

            // Salva a turma e o aluno
            turmaRepository.save(turma);
            return studentRepository.save(student);
        } else {
            throw new RuntimeException("Student or Turma not found");
        }
    }


    public Student atribuirPontos(UUID studentId, int points){
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (studentOpt.isPresent()){
            Student student = studentOpt.get();
            student.setPoints(student.getPoints() + points);
            return studentRepository.save(student);

        }
        else{
            throw new RuntimeException("Student not found");
        }
    }

}

package com.example.springboot.services;

import com.example.springboot.dto.AulaDto;
import com.example.springboot.models.Aula;
import com.example.springboot.models.TurmaModel;
import com.example.springboot.repository.AulaRepository;
import com.example.springboot.repository.StudentRepository;
import com.example.springboot.repository.TeacherRepository;
import com.example.springboot.repository.TurmaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AulaService {

    @Autowired
    private AulaRepository aulaRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private StudentRepository studentRepository;

    // Método para registrar uma nova aula
    public Aula registrarAula(AulaDto aulaDto) {
        Aula aula = new Aula();

        TurmaModel turma = turmaRepository.findById(aulaDto.turmaId())
                .orElseThrow(() -> new IllegalArgumentException("Turma não encontrada com o ID: " + aulaDto.turmaId()));

        aula.setId(UUID.randomUUID());
        aula.setTurma(turma);
        aula.setConteudo(aulaDto.conteudo());
        aula.setProfessor(teacherRepository.findById(aulaDto.professorId())
                .orElseThrow(() -> new IllegalArgumentException("Professor não encontrado com o ID: " + aulaDto.professorId())));
        aula.setStudents(studentRepository.findAllById(aulaDto.studentIds()));
        aula.setData(aulaDto.data());
        aula.setLinkAtividade(aulaDto.linkAtividade());

        return aulaRepository.save(aula);
    }

    // Método para obter todas as aulas
    public List<Aula> getAllAulas() {
        return aulaRepository.findAll();
    }

    // Método para obter uma aula por ID
    public Aula getAulaById(UUID id) {
        return aulaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Aula não encontrada com o ID: " + id));
    }

    // Método para atualizar uma aula existente
    public Aula updateAula(UUID id, AulaDto aulaDto) {
        Aula aula = getAulaById(id);
        TurmaModel turma = turmaRepository.findById(aulaDto.turmaId())
                .orElseThrow(() -> new IllegalArgumentException("Turma não encontrada com o ID: " + aulaDto.turmaId()));

        aula.setTurma(turma);
        aula.setConteudo(aulaDto.conteudo());
        aula.setProfessor(teacherRepository.findById(aulaDto.professorId())
                .orElseThrow(() -> new IllegalArgumentException("Professor não encontrado com o ID: " + aulaDto.professorId())));
        aula.setStudents(studentRepository.findAllById(aulaDto.studentIds()));
        aula.setData(aulaDto.data());
        aula.setLinkAtividade(aulaDto.linkAtividade());

        return aulaRepository.save(aula);
    }

    // Método para deletar uma aula por ID
    public void deleteAula(UUID id) {
        Aula aula = getAulaById(id);
        aulaRepository.delete(aula);
    }
}

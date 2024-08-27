package com.example.springboot.controllers;

import com.example.springboot.dto.AulaDto;
import com.example.springboot.models.Aula;
import com.example.springboot.models.Student;
import com.example.springboot.models.TurmaModel;
import com.example.springboot.repository.StudentRepository;
import com.example.springboot.repository.TurmaRepository;
import com.example.springboot.services.AulaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/aula")
@CrossOrigin(origins = "*")
public class AulaController {

    @Autowired
    private AulaService aulaService;

    @Autowired
    private TurmaRepository turmaRepository;
    @Autowired
    private StudentRepository studentRepository;

    // Endpoint para criar uma nova aula
    @PostMapping("/register")
    public ResponseEntity<Aula> registrarAula(@RequestBody AulaDto aulaDto) {
        Aula aula = aulaService.registrarAula(aulaDto);

        TurmaModel turma = turmaRepository.getById(aulaDto.turmaId());

        for (Student student : turma.getStudents()) {



            // Ganhar 10 pontos por aula
            student.setPoints(student.getPoints() + 10);

            student.getAulas().add(aula);
            // Contar o número total de aulas da turma
            int totalAulas = turma.getAulas().size();

            student.getAulas().add(aula);
            // Contar o número de aulas que o estudante participou
            long aulasComPresenca = turma.getAulas().stream()
                    .filter(a -> a.getStudents().contains(student))
                    .count();

            // Calcular o percentual de presença
            float percentualPresenca = ((float) aulasComPresenca / totalAulas) * 100;

            // Atualizar o percentual de presença do estudante
            student.setPresenca(percentualPresenca);

            // Salvar o estudante com o novo percentual de presença (se necessário)
            studentRepository.save(student);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(aula);
    }

    // Endpoint para obter todas as aulas
    @GetMapping
    public ResponseEntity<List<Aula>> getAllAulas() {
        List<Aula> aulas = aulaService.getAllAulas();
        return ResponseEntity.ok(aulas);
    }

    // Endpoint para obter uma aula por ID
    @GetMapping("/{id}")
    public ResponseEntity<Aula> getAulaById(@PathVariable UUID id) {
        Aula aula = aulaService.getAulaById(id);
        return ResponseEntity.ok(aula);
    }

    // Endpoint para atualizar uma aula existente
    @PutMapping("/{id}")
    public ResponseEntity<Aula> updateAula(@PathVariable UUID id, @RequestBody AulaDto aulaDto) {
        Aula aula = aulaService.updateAula(id, aulaDto);
        return ResponseEntity.ok(aula);
    }

    // Endpoint para deletar uma aula por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAula(@PathVariable UUID id) {
        aulaService.deleteAula(id);
        return ResponseEntity.noContent().build();
    }
}

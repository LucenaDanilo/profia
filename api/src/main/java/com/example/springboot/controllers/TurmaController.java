package com.example.springboot.controllers;

import com.example.springboot.dto.TurmaRecordDto;
import com.example.springboot.models.Student;
import com.example.springboot.models.Teacher;
import com.example.springboot.models.TurmaModel;
import com.example.springboot.repository.StudentRepository;
import com.example.springboot.repository.TeacherRepository;
import com.example.springboot.repository.TurmaRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@CrossOrigin("*")
@RestController
public class TurmaController {

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/turmas")
    public ResponseEntity<List<TurmaModel>> getAllTurmas() {
        List<TurmaModel> turmasList = turmaRepository.findAll();
        if (!turmasList.isEmpty()) {
            for (TurmaModel turma : turmasList) {
                UUID id = turma.getId();
                turma.add(linkTo(methodOn(TurmaController.class).getOneTurma(id)).withSelfRel());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(turmasList);
    }

    @GetMapping("/turmas/{id}")
    public ResponseEntity<Object> getOneTurma(@PathVariable(value = "id") UUID id) {
        Optional<TurmaModel> turmaO = turmaRepository.findById(id);
        if (turmaO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Turma not found.");
        }
        TurmaModel turma = turmaO.get();
        turma.add(linkTo(methodOn(TurmaController.class).getAllTurmas()).withRel("Turmas List"));
        return ResponseEntity.status(HttpStatus.OK).body(turma);
    }

    @PostMapping("/turmas")
    public ResponseEntity<TurmaModel> saveTurma(@RequestBody @Valid TurmaRecordDto turmaRecordDto) {
        // Criação da nova TurmaModel usando os dados do DTO
        TurmaModel turmaModel = new TurmaModel();
        turmaModel.setName(turmaRecordDto.name());
        turmaModel.setTrilha(turmaRecordDto.trilha());
        turmaModel.setSemester(turmaRecordDto.semester());
        turmaModel.setLevel(turmaRecordDto.level());
        turmaModel.setDatainicio(turmaRecordDto.datainicio());
        turmaModel.setDatafim(turmaRecordDto.datafim());
        turmaModel.setHorario(turmaRecordDto.horario());

        // Buscar os professores pelo ID e associá-los à turma
        List<Teacher> teacherList = teacherRepository.findAllById(turmaRecordDto.teacherIds());
        Set<Teacher> teachers = new HashSet<>(teacherList);
        turmaModel.setTeachers(teachers);

        // Salvar no banco de dados
        TurmaModel savedTurma = turmaRepository.save(turmaModel);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedTurma);
    }



    @DeleteMapping("/turmas/{id}")
    public ResponseEntity<Object> deleteTurma(@PathVariable(value = "id") UUID id) {
        Optional<TurmaModel> turmaO = turmaRepository.findById(id);
        if (turmaO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Turma not found.");
        }
        turmaRepository.delete(turmaO.get());
        return ResponseEntity.status(HttpStatus.OK).body("Turma deleted successfully.");
    }

    @PutMapping("/turmas/{id}")
    public ResponseEntity<Object> updateTurma(@PathVariable(value = "id") UUID id,
                                              @RequestBody @Valid TurmaRecordDto turmaRecordDto) {
        Optional<TurmaModel> turmaO = turmaRepository.findById(id);
        if (turmaO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Turma not found.");
        }
        var turmaModel = turmaO.get();
        BeanUtils.copyProperties(turmaRecordDto, turmaModel);
        return ResponseEntity.status(HttpStatus.OK).body(turmaRepository.save(turmaModel));
    }

    @GetMapping("/turma/{id}")
    public ResponseEntity<Object> getMyTurmas(@PathVariable(value = "id") UUID id) {
        Optional<Student> student = studentRepository.findById(id);

        if (student.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found.");
        }

        // Supondo que Student tenha uma lista de turmas
        return ResponseEntity.status(HttpStatus.OK).body(student.get().getTurmas());
    }

    @GetMapping("/myclassrooms")
    public ResponseEntity<Set<TurmaModel>> getMyClassrooms(@AuthenticationPrincipal UserDetails userDetails) {

        // Obtenha o email do token
        String email = userDetails.getUsername();

        // Tente encontrar o usuário no repositório de professores
        Optional<Teacher> optionalTeacher = teacherRepository.findByEmail(email);
        if (optionalTeacher.isPresent()) {
            Teacher teacher = optionalTeacher.get();
            return ResponseEntity.ok(teacher.getTurmas());
        }

        // Se não for um professor, tente encontrar no repositório de estudantes
        Optional<Student> optionalStudent = studentRepository.findByEmail(email);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            return ResponseEntity.ok(student.getTurmas());
        }

        // Se não for encontrado nem como Teacher nem como Student
        throw new UsernameNotFoundException("User not found");
    }





}

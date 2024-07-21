package com.example.springboot.controllers;

import com.example.springboot.dto.TurmaRecordDto;
import com.example.springboot.models.TurmaModel;
import com.example.springboot.repository.TurmaRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@CrossOrigin("*")
@RestController
public class TurmaController {

    @Autowired
    TurmaRepository turmaRepository;

    @GetMapping("/turmas")
    public ResponseEntity<List<TurmaModel>> getAllTurmas(){
        List<TurmaModel> turmasList = turmaRepository.findAll();
        if(!turmasList.isEmpty()) {
            for(TurmaModel turma : turmasList) {
                UUID id = turma.getIdTurma();
                turma.add(linkTo(methodOn(TurmaController.class).getOneTurma (id)).withSelfRel());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(turmasList);
    }

    @GetMapping("/turmas/{id}")
    public ResponseEntity<Object> getOneTurma(@PathVariable(value="id") UUID id){
        Optional<TurmaModel> turmaO = turmaRepository.findById(id);
        if(turmaO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Turma not found.");
        }
        turmaO.get().add(linkTo(methodOn(TurmaController.class).getAllTurmas()).withRel("Turmas List"));
        return ResponseEntity.status(HttpStatus.OK).body(turmaO.get());
    }

    @PostMapping("/turmas")
    public ResponseEntity<TurmaModel> saveTurma(@RequestBody @Valid TurmaRecordDto turmaRecordDto) {
        var turmaModel = new TurmaModel();
        BeanUtils.copyProperties(turmaRecordDto, turmaModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(turmaRepository.save(turmaModel));
    }

    @DeleteMapping("/turmas/{id}")
    public ResponseEntity<Object> deleteTurma(@PathVariable(value="id") UUID id) {
        Optional<TurmaModel> turmaO = turmaRepository.findById(id);
        if(turmaO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Turma not found.");
        }
        turmaRepository.delete(turmaO.get());
        return ResponseEntity.status(HttpStatus.OK).body("Turma deleted successfully.");
    }

    @PutMapping("/turmas/{id}")
    public ResponseEntity<Object> updateTurma(@PathVariable(value="id") UUID id,
                                              @RequestBody @Valid TurmaRecordDto turmaRecordDto) {
        Optional<TurmaModel> turmaO = turmaRepository.findById(id);
        if(turmaO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Turma not found.");
        }
        var turmaModel = turmaO.get();
        BeanUtils.copyProperties(turmaRecordDto, turmaModel);
        return ResponseEntity.status(HttpStatus.OK).body(turmaRepository.save(turmaModel));
    }

}
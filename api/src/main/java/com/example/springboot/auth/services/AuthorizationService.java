package com.example.springboot.auth.services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.example.springboot.dto.*;
import com.example.springboot.models.*;
import com.example.springboot.repository.*;
import com.example.springboot.security.TokenService;
import com.example.springboot.services.StudentService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


import jakarta.validation.Valid;

@Service
public class AuthorizationService implements UserDetailsService{
    private static AuthorizationService instance;

    @Autowired
    private ApplicationContext context;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private AuthenticationManager authenticationManager;

    // Private constructor to prevent instantiation
    private AuthorizationService() {
    }

    @PostConstruct
    public void init() {
        instance = this;
    }

    // Static method to get the instance
    public static AuthorizationService getInstance() {
        return instance;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    }

    public ResponseEntity<Object> login(@RequestBody @Valid AuthetinticationDto data) {
        try {
            authenticationManager = context.getBean(AuthenticationManager.class);

            var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);

            // Persistir a autenticação no SecurityContext
            SecurityContextHolder.getContext().setAuthentication(auth);

            var token = tokenService.generateToken((UserModel) auth.getPrincipal());

            // Obter detalhes do usuário autenticado
            UserModel user = (UserModel) auth.getPrincipal();

            // Criar o DTO apropriado com base no tipo de usuário
            Object userDto;
            if (user instanceof Teacher) {
                Teacher teacher = (Teacher) user;
                TeacherDto teacherDto = new TeacherDto();
                teacherDto.setId(teacher.getId());
                teacherDto.setName(teacher.getName());
                teacherDto.setEmail(teacher.getEmail());
                teacherDto.setUserRole(teacher.getUserRole());
                teacherDto.setCnpj(teacher.getCnpj());
                teacherDto.setHrAula(teacher.getHrAula());
                teacherDto.setEspecialidade(teacher.getEspecialidade());
                userDto = teacherDto;
            } else if (user instanceof Student) {
                Student student = (Student) user;
                TurmaModel turma = student.getTurmas().iterator().next();
                StudentDto studentDto = new StudentDto();
                studentDto.setId(student.getId());
                studentDto.setName(student.getName());
                studentDto.setEmail(student.getEmail());
                studentDto.setUserRole(student.getUserRole());
                studentDto.setResponsibleCPF(student.getResponsibleCPF());
                studentDto.setRegistration(student.getRegistration());
                studentDto.setBirthday(student.getBirthday());
                studentDto.setPoints(student.getPoints());
                studentDto.setTurmaId(turma.getId());
                userDto = studentDto;
            } else if (user instanceof Manager) {
                Manager manager = (Manager) user;
                ManagerDto managerDto = new ManagerDto();
                managerDto.setId(manager.getId());
                managerDto.setName(manager.getName());
                managerDto.setEmail(manager.getEmail());
                managerDto.setUserRole(manager.getUserRole());
                managerDto.setSuperuser(manager.isSuperuser());
                userDto = managerDto;
            } else {
                userDto = new UserDto();
                ((UserDto) userDto).setId(user.getId());
                ((UserDto) userDto).setName(user.getName());
                ((UserDto) userDto).setEmail(user.getEmail());
                ((UserDto) userDto).setUserRole(user.getUserRole());
            }

            // Retornar o token e os dados do usuário
            return ResponseEntity.ok(new LoginResponseDto(token, userDto));

        } catch (BadCredentialsException e) {
            // Retornar uma resposta com status 401 e mensagem de erro
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha incorretos.");
        } catch (AuthenticationException e) {
            // Tratar outras exceções de autenticação se necessário
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Erro ao tentar autenticar.");
        }
    }







    public ResponseEntity<Object> studentRegister(StudentRegisterDto registerDto) {
        // Criptografa a senha
        String encryptedPassword = passwordEncoder.encode("profia"); // senha padrão

        // Busca a Turma pelo UUID
        TurmaModel turma = turmaRepository.findById(registerDto.getTurmaId())
                .orElseThrow(() -> new RuntimeException("Turma not found with ID: " + registerDto.getTurmaId()));

        // Cria um Set com a Turma encontrada
        Set<TurmaModel> turmasSet = new HashSet<>();
        turmasSet.add(turma);

        // Cria o novo Student associado à Turma
        Student newUser = new Student(
                registerDto.getName(),
                encryptedPassword,
                registerDto.getEmail(),
                registerDto.getResponsibleCPF(),
                registerDto.getRegistration(),
                registerDto.getBirthday()
        );

        newUser.setCreatedAt(new Date(System.currentTimeMillis()));

        // Salva o novo Student no banco de dados
        studentRepository.save(newUser);
        studentService.matricularAluno(newUser.getId(), turma.getId());

        // Criar DTO de resposta
        StudentDto studentDto = new StudentDto();
        studentDto.setId(newUser.getId());
        studentDto.setName(newUser.getName());
        studentDto.setEmail(newUser.getEmail());
        studentDto.setUserRole(newUser.getUserRole());
        studentDto.setResponsibleCPF(newUser.getResponsibleCPF());
        studentDto.setRegistration(newUser.getRegistration());
        studentDto.setBirthday(newUser.getBirthday());
        studentDto.setPoints(newUser.getPoints());

        return ResponseEntity.ok(studentDto);
    }

    public ResponseEntity<Object> teacherRegister(TeacherRegisterDto registerDto) {
        // Criptografa a senha
        String encryptedPassword = passwordEncoder.encode(registerDto.getPassword());

        // Busca as Turmas pelo UUID
        Set<TurmaModel> turmas = new HashSet<>();
        if (registerDto.getTurmaIds() != null) {
            for (UUID turmaId : registerDto.getTurmaIds()) {
                TurmaModel turma = turmaRepository.findById(turmaId)
                        .orElseThrow(() -> new RuntimeException("Turma not found with ID: " + turmaId));
                turmas.add(turma);
            }
        }

        // Cria o novo Teacher associado às Turmas
        Teacher newUser = new Teacher(
                registerDto.getName(),
                encryptedPassword,
                registerDto.getEmail(),
                registerDto.getCnpj(),
                registerDto.getHrAula(),
                registerDto.getEspecialidade()
        );
        newUser.setTurmas(turmas);
        newUser.setCreatedAt(new Date(System.currentTimeMillis()));

        // Salva o novo Teacher no banco de dados
        teacherRepository.save(newUser);

        // Criar DTO de resposta
        TeacherDto teacherDto = new TeacherDto();
        teacherDto.setId(newUser.getId());
        teacherDto.setName(newUser.getName());
        teacherDto.setEmail(newUser.getEmail());
        teacherDto.setUserRole(newUser.getUserRole());
        teacherDto.setCnpj(newUser.getCnpj());
        teacherDto.setHrAula(newUser.getHrAula());
        teacherDto.setEspecialidade(newUser.getEspecialidade());

        return ResponseEntity.ok(teacherDto);
    }

    public ResponseEntity<Object> managerRegister(ManagerRegisterDto registerDto) {
        // Criptografa a senha
        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDto.getPassword());

        // Cria o novo Manager
        Manager newUser = new Manager(registerDto.getName(), encryptedPassword, registerDto.getEmail());
        newUser.setCreatedAt(new Date(System.currentTimeMillis()));

        // Salva o novo Manager no banco de dados
        managerRepository.save(newUser);

        // Criar DTO de resposta
        ManagerDto managerDto = new ManagerDto();
        managerDto.setId(newUser.getId());
        managerDto.setName(newUser.getName());
        managerDto.setEmail(newUser.getEmail());
        managerDto.setUserRole(newUser.getUserRole());
        managerDto.setSuperuser(newUser.isSuperuser());

        return ResponseEntity.ok(managerDto);
    }





}


package com.example.springboot.auth.services;

import java.sql.Date;
import java.time.LocalDate;

import com.example.springboot.dto.*;
import com.example.springboot.models.Manager;
import com.example.springboot.models.Student;
import com.example.springboot.models.Teacher;
import com.example.springboot.repository.ManagerRepository;
import com.example.springboot.repository.StudentRepository;
import com.example.springboot.repository.TeacherRepository;
import com.example.springboot.security.TokenService;
import com.example.springboot.models.UserModel;
import com.example.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


import jakarta.validation.Valid;

@Service
public class AuthorizationService implements UserDetailsService{
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

    private AuthenticationManager authenticationManager;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    }

    public ResponseEntity<Object> login(@RequestBody @Valid AuthetinticationDto data) {
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
            StudentDto studentDto = new StudentDto();
            studentDto.setId(student.getId());
            studentDto.setName(student.getName());
            studentDto.setEmail(student.getEmail());
            studentDto.setUserRole(student.getUserRole());
            studentDto.setResponsibleCPF(student.getResponsibleCPF());
            studentDto.setRegistration(student.getRegistration());
            studentDto.setBirthday(student.getBirthday());
            studentDto.setPoints(student.getPoints());
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
    }





    public ResponseEntity<Object> studentRegister(StudentRegisterDto registerDto) {





        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDto.getPassword());


        Student newUser = new Student(registerDto.getName(),encryptedPassword,registerDto.getEmail(), registerDto.getResponsibleCPF(),registerDto.getRegistration(),LocalDate.of(2024,12,1));


        newUser.setCreatedAt(new Date(System.currentTimeMillis()));
        studentRepository.save(newUser);

        return ResponseEntity.ok().build();
    }


    public ResponseEntity<Object> teacherRegister(TeacherRegisterDto registerDto) {





        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDto.getPassword());


        Teacher newUser = new Teacher(registerDto.getName(),encryptedPassword,registerDto.getEmail(),registerDto.getCnpj(), registerDto.getHrAula(),registerDto.getEspecialidade() );


        newUser.setCreatedAt(new Date(System.currentTimeMillis()));
        teacherRepository.save(newUser);

        return ResponseEntity.ok().build();
    }


    public ResponseEntity<Object> managerRegister(ManagerRegisterDto registerDto) {

        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDto.getPassword());


        Manager newUser = new Manager(registerDto.getName(),encryptedPassword,registerDto.getEmail());

        newUser.setCreatedAt(new Date(System.currentTimeMillis()));
        managerRepository.save(newUser);

        return ResponseEntity.ok().build();
    }




}


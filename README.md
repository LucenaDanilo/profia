# School Management and Gamification System

Welcome to the School Management and Gamification System for our programming school. This system is designed to manage students, teachers, and classes while also incorporating a gamification mechanism to reward students for good behavior. Students can earn points and redeem them for products through the system.

## Features

- **Student Management:** Create, retrieve, and manage student information.
- **Teacher Management:** Register and manage teachers.
- **Class Management:** Create and manage classes (Turmas) with associated teachers.
- **Product Management:** Manage products that students can redeem using their earned points.
- **Gamification:** Award points to students and allow them to exchange these points for products.

## API Endpoints

### Student

#### Create Student
- **POST /auth/student/register**
  - **Permission:** Only Managers
  - **Body:**
    ```json
    {
        "name": "",
        "password": "",
        "email": "",
        "responsibleCPF": "",
        "registration": "",
        "turmaId": ""
    }
    ```

#### Get All Students
- **GET /api/students**
  - **Permission:** Only Managers and Teachers
  - **Example Response:**
    ```json
    [
        {
            "id": "948648bb-ba70-4ce4-9e8a-9cb8a1f7b6ee",
            "name": "guga145673",
            "email": "userstudent2@exemplo.com",
            "password": "$2a$10$YZsMHETs8MB7/oYRzTdcZe5UE0ZBtDtcBt6X96Rhmo6azt35PZgtW",
            "userRole": "ROLE_STUDENT",
            "createdAt": "2024-08-16T02:41:39.644+00:00",
            "updatedAt": null,
            "responsibleCPF": "438229e8",
            "registration": "32e494",
            "points": 100,
            "age": 0,
            "enabled": true,
            "accountNonExpired": true,
            "accountNonLocked": true,
            "authorities": [
                {
                    "authority": "ROLE_STUDENT"
                }
            ],
            "username": "userstudent2@exemplo.com",
            "credentialsNonExpired": true
        }
    ]
    ```

#### Get a Specific Student
- **GET /api/students/{id}**
  - **Permission:** Only Managers and Teachers
  - **Example Response:**
    ```json
    {
        "id": "948648bb-ba70-4ce4-9e8a-9cb8a1f7b6ee",
        "name": "guga145673",
        "email": "userstudent2@exemplo.com",
        "password": "$2a$10$YZsMHETs8MB7/oYRzTdcZe5UE0ZBtDtcBt6X96Rhmo6azt35PZgtW",
        "userRole": "ROLE_STUDENT",
        "createdAt": "2024-08-16T02:41:39.644+00:00",
        "updatedAt": null,
        "responsibleCPF": "438229e8",
        "registration": "32e494",
        "points": 100,
        "age": 0,
        "enabled": true,
        "credentialsNonExpired": true,
        "authorities": [
            {
                "authority": "ROLE_STUDENT"
            }
        ],
        "username": "userstudent2@exemplo.com",
        "accountNonExpired": true,
        "accountNonLocked": true
    }
    ```

#### Add Coins
- **POST /api/students/coins**
  - **Permission:** Only Managers and Teachers
  - **Body:**
    ```json
    {
        "studentId": "",
        "points": 0
    }
    ```

### Teacher

#### Create Teacher
- **POST /auth/teacher/register**
  - **Permission:** Only Managers
  - **Body:**
    ```json
    {
        "name": "",
        "password": "",
        "email": "",
        "cnpj": "",
        "hrAula": 0.0,
        "especialidade": ""
    }
    ```

#### Get All Teachers
- **GET /api/teachers**
  - **Permission:** Only Managers
  - **Example Response:**
    ```json
    [
        {
            "id": "abc123",
            "name": "Professor Exemplo",
            "email": "teacher@exemplo.com",
            "cnpj": "12.345.678/0001-99",
            "hrAula": 50.0,
            "especialidade": "Matemática",
            "userRole": "ROLE_TEACHER",
            "createdAt": "2024-08-16T02:41:39.644+00:00",
            "updatedAt": null,
            "enabled": true,
            "accountNonExpired": true,
            "accountNonLocked": true,
            "credentialsNonExpired": true
        }
    ]
    ```

#### Get a Specific Teacher
- **GET /api/teachers/{id}**
  - **Permission:** Only Managers
  - **Example Response:**
    ```json
    {
        "id": "abc123",
        "name": "Professor Exemplo",
        "email": "teacher@exemplo.com",
        "cnpj": "12.345.678/0001-99",
        "hrAula": 50.0,
        "especialidade": "Matemática",
        "userRole": "ROLE_TEACHER",
        "createdAt": "2024-08-16T02:41:39.644+00:00",
        "updatedAt": null,
        "enabled": true,
        "accountNonExpired": true,
        "accountNonLocked": true,
        "credentialsNonExpired": true
    }
    ```

### Class (Turma)

#### Create Class
- **POST /turmas**
  - **Permission:** Only Managers
  - **Body:**
    ```json
    {
        "name": "Turma de 1",
        "trilha": "Desenvolvimento Web",
        "semester": "2024-1",
        "level": 1,
        "datainicio": "2024-08-15",
        "datafim": "2024-12-15",
        "horario": "14:00:00",
        "teacherIds": ["4551fd07-d6b7-4c1d-ae2a-23dfa7d6b3cb"]
    }
    ```

#### Get All Classes
- **GET /turmas**
  - **Permission:** Only Managers
  - **Example Response:**
    ```json
    [
        {
            "id": "turma123",
            "name": "Turma de 1",
            "trilha": "Desenvolvimento Web",
            "semester": "2024-1",
            "level": 1,
            "datainicio": "2024-08-15",
            "datafim": "2024-12-15",
            "horario": "14:00:00",
            "teacherIds": ["4551fd07-d6b7-4c1d-ae2a-23dfa7d6b3cb"]
        }
    ]
    ```

#### Get a Specific Class
- **GET /turmas/{id}**
  - **Permission:** Only Managers
  - **Example Response:**
    ```json
    {
        "id": "turma123",
        "name": "Turma de 1",
        "trilha": "Desenvolvimento Web",
        "semester": "2024-1",
        "level": 1,
        "datainicio": "2024-08-15",
        "datafim": "2024-12-15",
        "horario": "14:00:00",
        "teacherIds": ["4551fd07-d6b7-4c1d-ae2a-23dfa7d6b3cb"]
    }
    ```

### Product

#### Create Product
- **POST /products**
  - **Permission:** Only Managers
  - **Body:**
    ```json
    {
        "name": "Smartphone TechX Pro",
        "value": 999.99,
        "description": "O TechX Pro é um smartphone de última geração com processador ultra-rápido, câmera de 108MP e bateria de longa duração.",
        "image": "https://example.com/images/smartphone-techx-pro.jpg",
        "link": null
    }
    ```

#### Get All Products
- **GET /products**
  - **Permission:** Only Managers
  - **Example Response:**
    ```json
    [
        {
            "id": "product123",
            "name": "Smartphone TechX Pro",
            "value": 999.99,
            "description": "O TechX Pro é um smartphone de última geração com processador ultra-rápido, câmera de 108MP e bateria de longa duração.",
            "image": "https://example.com/images/smartphone-techx-pro.jpg",
            "link": null
        }
    ]
    ```

#### Get a Specific Product
- **GET /products/{id}**
  - **Permission:** Only Managers
  - **Example Response:**
    ```json
    {
        "id": "product123",
        "name": "Smartphone TechX Pro",
        "value": 999.99,
        "description": "O TechX Pro é um smartphone de última geração com processador ultra-rápido, câmera de 108MP e bateria de longa duração.",
        "image": "https://example.com/images/smartphone-techx-pro.jpg",
        "link": null
    }
    ```

#### Update Product
- **PUT /products/{id}**
  - **Permission:** Only Managers
  - **Body:**
    ```json
    {
        "name": "Smartphone TechX Pro",
        "value": 999.99,
        "description": "O TechX Pro é um smartphone de última geração com processador ultra-rápido, câmera de 108MP e bateria de longa duração.",
        "image": "https://example.com/images/smartphone-techx-pro.jpg",
        "link": null
    }
    ```

#### Delete Product
- **DELETE /products/{id}**
  - **Permission:** Only Managers

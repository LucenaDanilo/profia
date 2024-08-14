package com.example.springboot.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ManagerDto extends UserDto {
    private boolean isSuperuser;
}
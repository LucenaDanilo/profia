package com.example.springboot.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


@Getter
@Setter
public class PointsDto {
    private UUID studentId;
    private int points;
}

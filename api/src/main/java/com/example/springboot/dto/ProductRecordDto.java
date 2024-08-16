package com.example.springboot.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;


@Getter
@Setter

public class ProductRecordDto {
    private String name ;
    private int value;
    private String description;
    private String image;
    private String link;

    // Getters e Setters
}

package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PatientResponseDto {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String gender;
    private LocalDate dateOfBirth;
    private String address;
    private Boolean active;
}

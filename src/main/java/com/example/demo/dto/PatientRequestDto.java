package com.example.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PatientRequestDto {

    @NotBlank
    private String name;

    @Email
    private String email;

    private String phone;
    private String gender;
    private LocalDate dateOfBirth;
    private String address;
}

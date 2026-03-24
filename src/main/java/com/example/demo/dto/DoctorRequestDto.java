package com.example.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorRequestDto {

    @NotBlank
    private String name;

    @Email
    private String email;

    private String phone;

    private Long departmentId;
}

package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorResponseDto {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String departmentName;
    private Boolean active;
}

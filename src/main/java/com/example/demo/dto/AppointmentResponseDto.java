package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AppointmentResponseDto {

    private Long id;
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private LocalDateTime appointmentDate;
    private String status;
    private Boolean active;
}

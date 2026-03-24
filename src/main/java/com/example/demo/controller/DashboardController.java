package com.example.demo.controller;

import com.example.demo.repository.AppointmentRepository;
import com.example.demo.repository.DoctorRepository;
import com.example.demo.repository.PatientRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin
public class DashboardController {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;

    public DashboardController(
            PatientRepository patientRepository,
            DoctorRepository doctorRepository,
            AppointmentRepository appointmentRepository
    ) {
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("patients", patientRepository.count());
        stats.put("doctors", doctorRepository.count());
        stats.put("appointments", appointmentRepository.count());
        stats.put("activeAppointments",
                appointmentRepository.countByActiveTrue());
        stats.put("inactiveAppointments",
                appointmentRepository.countByActiveFalse());
        return stats;
    }
}

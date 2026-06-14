//package com.example.demo.controller;
//
//import com.example.demo.dto.AppointmentRequest;
//import com.example.demo.entity.Appointment;
//import com.example.demo.entity.Doctor;
//import com.example.demo.entity.Patient;
//import com.example.demo.repository.AppointmentRepository;
//import com.example.demo.repository.DoctorRepository;
//import com.example.demo.repository.PatientRepository;
//import com.example.demo.service.AppointmentService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDateTime;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/appointments")
//@CrossOrigin
//public class AppointmentController {
//
//    private final AppointmentRepository appointmentRepository;
//    private final PatientRepository patientRepository;
//    private final DoctorRepository doctorRepository;
//    private final AppointmentService appointmentService;
//
//
//    public AppointmentController(
//            AppointmentRepository appointmentRepository,
//            PatientRepository patientRepository,
//            DoctorRepository doctorRepository,
//            AppointmentService appointmentService
//    ) {
//        this.appointmentRepository = appointmentRepository;
//        this.patientRepository = patientRepository;
//        this.doctorRepository = doctorRepository;
//        this.appointmentService = appointmentService;
//    }
//
//    @PostMapping
//    public ResponseEntity<Appointment> create(@RequestBody AppointmentRequest body) {
//
//        Patient patient = patientRepository.findById(body.getPatientId())
//                .orElseThrow(() -> new RuntimeException("Patient not found"));
//
//        Doctor doctor = doctorRepository.findById(body.getDoctorId())
//                .orElseThrow(() -> new RuntimeException("Doctor not found"));
//
//        Appointment appointment = new Appointment();
//        appointment.setPatient(patient);
//        appointment.setDoctor(doctor);
//        appointment.setAppointmentDate(body.getAppointmentDate());
//        appointment.setStatus("BOOKED");
//
//        return ResponseEntity.ok(appointmentRepository.save(appointment));
//    }
//
//
//    @GetMapping("/page")
//    public ResponseEntity<?> getAllPaged(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "5") int size,
//            @RequestParam(defaultValue = "id") String sortBy,
//            @RequestParam(defaultValue = "asc") String direction
//    ) {
//        return ResponseEntity.ok(
//                appointmentService.getAll(page, size, sortBy, direction)
//        );
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> softDelete(@PathVariable Long id) {
//        Appointment appt = appointmentRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Appointment not found"));
//
//        appt.setActive(false);
//        return ResponseEntity.ok(appointmentRepository.save(appt));
//    }
//
//}

package com.example.demo.controller;

import com.example.demo.dto.AppointmentRequest;
import com.example.demo.dto.AppointmentResponseDto;
import com.example.demo.dto.StatusUpdateRequest;
import com.example.demo.entity.Appointment;
import com.example.demo.entity.Doctor;
import com.example.demo.entity.Patient;
import com.example.demo.repository.AppointmentRepository;
import com.example.demo.repository.DoctorRepository;
import com.example.demo.repository.PatientRepository;
import com.example.demo.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentService appointmentService;

    public AppointmentController(
            AppointmentRepository appointmentRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository,
            AppointmentService appointmentService
    ) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentService = appointmentService;
    }

    // ✅ CREATE
    @PreAuthorize("hasRole('RECEPTIONIST')")
    @PostMapping
    public ResponseEntity<AppointmentResponseDto> create(
            @RequestBody AppointmentRequest body
    ) {

        Patient patient = patientRepository.findById(body.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository.findById(body.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(body.getAppointmentDate());
        appointment.setStatus("BOOKED");
        appointment.setActive(true);

        Appointment saved = appointmentRepository.save(appointment);

        AppointmentResponseDto dto = new AppointmentResponseDto();
        dto.setId(saved.getId());
        dto.setPatientId(patient.getId());
        dto.setPatientName(patient.getName());
        dto.setDoctorId(doctor.getId());
        dto.setDoctorName(doctor.getName());
        dto.setAppointmentDate(saved.getAppointmentDate());
        dto.setStatus(saved.getStatus());
        dto.setActive(saved.getActive());

        return ResponseEntity.ok(dto);
    }

    // ✅ GET ALL
//    @PreAuthorize("hasAnyRole('DOCTOR','RECEPTIONIST')")
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(
                appointmentRepository.findByActiveTrue().stream().map(a -> {
                    AppointmentResponseDto dto = new AppointmentResponseDto();
                    dto.setId(a.getId());
                    dto.setPatientId(a.getPatient().getId());
                    dto.setPatientName(a.getPatient().getName());
                    dto.setDoctorId(a.getDoctor().getId());
                    dto.setDoctorName(a.getDoctor().getName());
                    dto.setAppointmentDate(a.getAppointmentDate());
                    dto.setStatus(a.getStatus());
                    dto.setActive(a.getActive());
                    return dto;
                }).toList()
        );
    }

    // ✅ PAGED
    @PreAuthorize("hasAnyRole('DOCTOR','RECEPTIONIST')")
    @GetMapping("/page")
    public ResponseEntity<?> getAllPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        return ResponseEntity.ok(
                appointmentService.getAll(page, size, sortBy, direction)
        );
    }

    // ✅ SOFT DELETE
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> softDelete(@PathVariable Long id) {
        Appointment appt = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appt.setActive(false);
        appointmentRepository.save(appt);

        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('DOCTOR')")
    @PutMapping("/status/{id}")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest request
    ) {
        Appointment appt = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        System.out.println("STATUS: " + request.getStatus());

        System.out.println("FULL REQUEST: " + request);
        System.out.println("STATUS VALUE: " + request.getStatus());

        appt.setStatus(request.getStatus());

        return ResponseEntity.ok(appointmentRepository.save(appt));
    }
}

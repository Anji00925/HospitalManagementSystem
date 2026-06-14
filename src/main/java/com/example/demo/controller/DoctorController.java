package com.example.demo.controller;

import com.example.demo.dto.DoctorRequestDto;
import com.example.demo.dto.DoctorResponseDto;
import com.example.demo.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// ✅ ADD THIS IMPORT
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin
public class DoctorController {

    @Autowired
    private DoctorService service;

    // ✅ ONLY ADMIN CAN CREATE DOCTOR
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<DoctorResponseDto> create(
            @Valid @RequestBody DoctorRequestDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    // (optional) allow all logged users
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }
}
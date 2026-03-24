package com.example.demo.controller;

import com.example.demo.dto.DoctorRequestDto;
import com.example.demo.dto.DoctorResponseDto;
import com.example.demo.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin
public class DoctorController {

    @Autowired
    private DoctorService service;

    @PostMapping
    public ResponseEntity<DoctorResponseDto> create(
            @Valid @RequestBody DoctorRequestDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

}

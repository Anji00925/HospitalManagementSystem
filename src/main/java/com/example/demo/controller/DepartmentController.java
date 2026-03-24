package com.example.demo.controller;

import com.example.demo.entity.Department;
import com.example.demo.service.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin
public class DepartmentController {

    private final DepartmentService service;

    public DepartmentController(DepartmentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Department department) {
        return ResponseEntity.ok(service.create(department));
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

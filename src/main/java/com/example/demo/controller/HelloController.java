package com.example.demo.controller;


import com.example.demo.dto.StudentDto;
import com.example.demo.entity.Student;
import com.example.demo.dto.StudentResponseDto;
import com.example.demo.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;


import java.util.List;

@RestController
public class HelloController {

    private final StudentService service;

    public HelloController(StudentService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody StudentDto dto) {
        service.save(dto);
        return ResponseEntity.status(201).body("Saved");
    }

    @GetMapping("/students/name/{name}")
    public ResponseEntity<List<StudentResponseDto>> getByName(@PathVariable String name) {
        return ResponseEntity.ok(service.getByName(name));
    }

    @GetMapping("/students/page")
    public ResponseEntity<List<StudentResponseDto>> getPaged(
            @RequestParam int page,
            @RequestParam int size) {

        return ResponseEntity.ok(service.getPaged(page, size));
    }

    @GetMapping("/students/sort")
    public ResponseEntity<List<StudentResponseDto>> getSorted() {
        return ResponseEntity.ok(service.getSorted());
    }




    @GetMapping("/students")
    public ResponseEntity<List<StudentResponseDto>> getAll() {
        return ResponseEntity.ok(service.getAllResponse());
    }



    @PutMapping("/student/{id}")
    public ResponseEntity<String> update(@PathVariable int id,
                                         @Valid @RequestBody StudentDto dto) {
        boolean updated = service.update(id, dto);
        if (!updated) {
            return ResponseEntity.status(404).body("Not Found");
        }
        return ResponseEntity.ok("Updated");
    }


    @DeleteMapping("/student/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        boolean deleted = service.delete(id);
        if (!deleted) {
            return ResponseEntity.status(404).body("Not Found");
        }
        return ResponseEntity.ok("Deleted");
    }

}

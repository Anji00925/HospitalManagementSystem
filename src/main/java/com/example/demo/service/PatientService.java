package com.example.demo.service;

import com.example.demo.dto.PatientRequestDto;
import com.example.demo.dto.PatientResponseDto;
import com.example.demo.entity.Patient;
import com.example.demo.repository.PatientRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    @Autowired
    private PatientRepository repository;

    @Autowired
    private ModelMapper mapper;

    public PatientResponseDto create(PatientRequestDto dto) {
        Patient patient = mapper.map(dto, Patient.class);
        patient.setActive(true);
        return mapper.map(repository.save(patient), PatientResponseDto.class);
    }

    public Page<PatientResponseDto> getAll(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return repository.findAll(pageable)
                .map(p -> mapper.map(p, PatientResponseDto.class));
    }

    public Page<PatientResponseDto> searchByName(String name, Pageable pageable) {
        return repository.findByNameContainingIgnoreCase(name, pageable)
                .map(p -> mapper.map(p, PatientResponseDto.class));
    }

    public Page<PatientResponseDto> searchByEmail(String email, Pageable pageable) {
        return repository.findByEmailContainingIgnoreCase(email, pageable)
                .map(p -> mapper.map(p, PatientResponseDto.class));
    }

    public PatientResponseDto getById(Long id) {
        return mapper.map(
                repository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Patient not found")),
                PatientResponseDto.class
        );
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

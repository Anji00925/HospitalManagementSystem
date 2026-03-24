package com.example.demo.repository;

import com.example.demo.entity.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    Page<Patient> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Patient> findByEmailContainingIgnoreCase(String email, Pageable pageable);
    long countByActiveTrue();

}

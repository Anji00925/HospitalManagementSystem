package com.example.demo.service;

import com.example.demo.dto.DoctorRequestDto;
import com.example.demo.dto.DoctorResponseDto;
import com.example.demo.entity.Department;
import com.example.demo.entity.Doctor;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.DoctorRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private ModelMapper mapper;

    public DoctorResponseDto create(DoctorRequestDto dto) {
        Department department = null;

        if (dto.getDepartmentId() != null) {
            department = departmentRepository.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
        }


        Doctor doctor = mapper.map(dto, Doctor.class);
        doctor.setDepartment(department);
        doctor.setActive(true);

        Doctor saved = doctorRepository.save(doctor);

        DoctorResponseDto response = new DoctorResponseDto();
        response.setId(saved.getId());
        response.setName(saved.getName());
        response.setEmail(saved.getEmail());
        response.setPhone(saved.getPhone());
        if (department != null) {
            response.setDepartmentName(department.getName());
        } else {
            response.setDepartmentName(null);
        }

        response.setActive(saved.getActive());

        return response;
    }

    public List<DoctorResponseDto> getAll() {
        return doctorRepository.findAll().stream().map(d -> {
            DoctorResponseDto dto = new DoctorResponseDto();
            dto.setId(d.getId());
            dto.setName(d.getName());
            dto.setEmail(d.getEmail());
            dto.setPhone(d.getPhone());
            dto.setActive(d.getActive());
            dto.setDepartmentName(
                    d.getDepartment() != null ? d.getDepartment().getName() : null
            );
            return dto;
        }).toList();
    }

    public DoctorResponseDto getById(Long id) {
        Doctor d = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        DoctorResponseDto dto = new DoctorResponseDto();
        dto.setId(d.getId());
        dto.setName(d.getName());
        dto.setEmail(d.getEmail());
        dto.setPhone(d.getPhone());
        dto.setActive(d.getActive());
        dto.setDepartmentName(
                d.getDepartment() != null ? d.getDepartment().getName() : null
        );
        return dto;
    }

}

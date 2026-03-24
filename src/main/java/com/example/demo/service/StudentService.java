package com.example.demo.service;

import com.example.demo.dto.StudentDto;
import com.example.demo.dto.StudentResponseDto;
import com.example.demo.entity.Student;
import com.example.demo.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public void save(StudentDto dto) {
        Student s = new Student();
        s.setId(dto.getId());
        s.setName(dto.getName());
        repo.save(s);
    }

    public List<StudentResponseDto> getAllResponse() {
        return repo.findAll()
                .stream()
                .map(s -> new StudentResponseDto(s.getId(), s.getName()))
                .toList();
    }

    public List<StudentResponseDto> getByName(String name) {
        return repo.findByName(name)
                .stream()
                .map(s -> new StudentResponseDto(s.getId(), s.getName()))
                .toList();
    }

    public List<StudentResponseDto> getPaged(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return repo.findAll(pageable)
                .getContent()
                .stream()
                .map(s -> new StudentResponseDto(s.getId(), s.getName()))
                .toList();
    }

    public List<StudentResponseDto> getSorted() {

        return repo.findAll(Sort.by("name"))
                .stream()
                .map(s -> new StudentResponseDto(s.getId(), s.getName()))
                .toList();
    }




    public List<Student> getAll() {
        return repo.findAll();
    }

    public boolean update(int id, StudentDto dto) {
        Student s = repo.findById(id).orElse(null);
        if (s == null) return false;
        s.setName(dto.getName());
        repo.save(s);
        return true;
    }

    public boolean delete(int id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}

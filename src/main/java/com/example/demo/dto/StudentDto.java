package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class StudentDto {

    @Positive(message = "Id must be positive")
    private int id;

    @NotBlank(message = "Name cannot be empty")
    private String name;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}

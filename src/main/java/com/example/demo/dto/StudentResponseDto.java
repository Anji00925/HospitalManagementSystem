package com.example.demo.dto;

public class StudentResponseDto {

    private int id;
    private String name;

    public StudentResponseDto(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }
}

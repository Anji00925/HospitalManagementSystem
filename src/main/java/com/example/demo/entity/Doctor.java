package com.example.demo.entity;

import com.example.demo.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name = "doctors")
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = true)
    private Department department;

    @Column(nullable = false)
    private Boolean active = true;
}

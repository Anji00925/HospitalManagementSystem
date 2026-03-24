package com.example.demo.entity;

import com.example.demo.entity.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import java.time.LocalDate;

@Entity
@Table(name = "patients")
@SQLDelete(sql = "UPDATE patients SET active = false WHERE id = ?")
@SQLRestriction("active = true")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Patient extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @Email
    @Column(nullable = false, unique = true)
    private String email;

    private String phone;

    private String gender;

    private LocalDate dateOfBirth;

    private String address;

    @Column(nullable = false)
    private Boolean active = true;
}

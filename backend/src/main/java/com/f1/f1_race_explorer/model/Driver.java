package com.f1.f1_race_explorer.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "drivers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Driver {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String firstName;
    
    private String lastName;
    
    private String code;
    
    private int number;
    
    private String nationality;
    
    private LocalDate dateOfBirth;
    
    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
    
    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL)
    private List<Result> results;
}
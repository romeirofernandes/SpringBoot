package com.f1.f1_race_explorer.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "races")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Race {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    private int season;
    
    private int round;
    
    private LocalDate raceDate;
    
    @ManyToOne
    @JoinColumn(name = "circuit_id")
    private Circuit circuit;
    
    @OneToMany(mappedBy = "race", cascade = CascadeType.ALL)
    private List<Result> results;
}
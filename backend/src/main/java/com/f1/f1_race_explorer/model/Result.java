package com.f1.f1_race_explorer.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "results")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Result {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private int position;
    
    private int points;
    
    private int grid;
    
    private int laps;
    
    private String status;
    
    private String fastestLapTime;
    
    private int fastestLapSpeed;
    
    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;
    
    @ManyToOne
    @JoinColumn(name = "race_id")
    private Race race;
}
package com.f1.f1_race_explorer.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "circuits")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Circuit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String location;

    private String country;

    private double length;

    private int numberOfLaps;

    // Add these fields:
    private int turns;
    private int firstGrandPrix;

    @OneToMany(mappedBy = "circuit", cascade = CascadeType.ALL)
    private List<Race> races;
}
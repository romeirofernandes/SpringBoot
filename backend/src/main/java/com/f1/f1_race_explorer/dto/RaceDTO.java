package com.f1.f1_race_explorer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RaceDTO {
    private Long id;
    private String name;
    private int season;
    private int round;
    private LocalDate raceDate;
    private Long circuitId;
    private String circuitName;
}
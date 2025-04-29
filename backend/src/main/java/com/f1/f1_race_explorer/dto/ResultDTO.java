package com.f1.f1_race_explorer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResultDTO {
    private Long id;
    private int position;
    private int points;
    private int grid;
    private int laps;
    private String status;
    private String fastestLapTime;
    private int fastestLapSpeed;
    private Long driverId;
    private String driverName;
    private Long raceId;
    private String raceName;
}
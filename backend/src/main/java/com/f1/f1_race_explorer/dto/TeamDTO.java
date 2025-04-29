package com.f1.f1_race_explorer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamDTO {
    private Long id;
    private String name;
    private String nationality;
}
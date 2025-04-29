package com.f1.f1_race_explorer.controller;

import com.f1.f1_race_explorer.dto.TeamDTO;
import com.f1.f1_race_explorer.service.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TeamController {
    
    private final TeamService teamService;
    
    @GetMapping
    public ResponseEntity<List<TeamDTO>> getAllTeams() {
        return ResponseEntity.ok(teamService.getAllTeams());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TeamDTO> getTeamById(@PathVariable Long id) {
        return ResponseEntity.ok(teamService.getTeamById(id));
    }
    
    @PostMapping
    public ResponseEntity<TeamDTO> createTeam(@Valid @RequestBody TeamDTO teamDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(teamService.createTeam(teamDTO));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TeamDTO> updateTeam(@PathVariable Long id, @Valid @RequestBody TeamDTO teamDTO) {
        return ResponseEntity.ok(teamService.updateTeam(id, teamDTO));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {
        teamService.deleteTeam(id);
        return ResponseEntity.noContent().build();
    }
}
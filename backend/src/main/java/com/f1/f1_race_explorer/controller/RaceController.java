package com.f1.f1_race_explorer.controller;

import com.f1.f1_race_explorer.dto.RaceDTO;
import com.f1.f1_race_explorer.service.RaceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/races")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RaceController {
    
    private final RaceService raceService;
    
    @GetMapping
    public ResponseEntity<List<RaceDTO>> getAllRaces() {
        return ResponseEntity.ok(raceService.getAllRaces());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<RaceDTO> getRaceById(@PathVariable Long id) {
        return ResponseEntity.ok(raceService.getRaceById(id));
    }
    
    @GetMapping("/season/{season}")
    public ResponseEntity<List<RaceDTO>> getRacesBySeason(@PathVariable int season) {
        return ResponseEntity.ok(raceService.getRacesBySeason(season));
    }
    
    @PostMapping
    public ResponseEntity<RaceDTO> createRace(@Valid @RequestBody RaceDTO raceDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(raceService.createRace(raceDTO));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<RaceDTO> updateRace(@PathVariable Long id, @Valid @RequestBody RaceDTO raceDTO) {
        return ResponseEntity.ok(raceService.updateRace(id, raceDTO));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRace(@PathVariable Long id) {
        raceService.deleteRace(id);
        return ResponseEntity.noContent().build();
    }
}
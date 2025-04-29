package com.f1.f1_race_explorer.controller;

import com.f1.f1_race_explorer.dto.DriverDTO;
import com.f1.f1_race_explorer.service.DriverService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DriverController {
    
    private final DriverService driverService;
    
    @GetMapping
    public ResponseEntity<List<DriverDTO>> getAllDrivers() {
        return ResponseEntity.ok(driverService.getAllDrivers());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DriverDTO> getDriverById(@PathVariable Long id) {
        return ResponseEntity.ok(driverService.getDriverById(id));
    }
    
    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<DriverDTO>> getDriversByTeam(@PathVariable Long teamId) {
        return ResponseEntity.ok(driverService.getDriversByTeam(teamId));
    }
    
    @PostMapping
    public ResponseEntity<DriverDTO> createDriver(@Valid @RequestBody DriverDTO driverDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(driverService.createDriver(driverDTO));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<DriverDTO> updateDriver(@PathVariable Long id, @Valid @RequestBody DriverDTO driverDTO) {
        return ResponseEntity.ok(driverService.updateDriver(id, driverDTO));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDriver(@PathVariable Long id) {
        driverService.deleteDriver(id);
        return ResponseEntity.noContent().build();
    }
}
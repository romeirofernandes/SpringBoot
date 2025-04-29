package com.f1.f1_race_explorer.service;

import com.f1.f1_race_explorer.dto.DriverDTO;
import com.f1.f1_race_explorer.exception.ResourceNotFoundException;
import com.f1.f1_race_explorer.model.Driver;
import com.f1.f1_race_explorer.model.Team;
import com.f1.f1_race_explorer.repository.DriverRepository;
import com.f1.f1_race_explorer.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriverService {
    
    private final DriverRepository driverRepository;
    private final TeamRepository teamRepository;
    
    public List<DriverDTO> getAllDrivers() {
        return driverRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public DriverDTO getDriverById(Long id) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with id " + id));
        return convertToDTO(driver);
    }
    
    public List<DriverDTO> getDriversByTeam(Long teamId) {
        return driverRepository.findByTeamId(teamId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public DriverDTO createDriver(DriverDTO driverDTO) {
        Team team = teamRepository.findById(driverDTO.getTeamId())
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id " + driverDTO.getTeamId()));
        
        Driver driver = Driver.builder()
                .firstName(driverDTO.getFirstName())
                .lastName(driverDTO.getLastName())
                .code(driverDTO.getCode())
                .number(driverDTO.getNumber())
                .nationality(driverDTO.getNationality())
                .dateOfBirth(driverDTO.getDateOfBirth())
                .team(team)
                .build();
        
        Driver savedDriver = driverRepository.save(driver);
        return convertToDTO(savedDriver);
    }
    
    @Transactional
    public DriverDTO updateDriver(Long id, DriverDTO driverDTO) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with id " + id));
        
        Team team = null;
        if (driverDTO.getTeamId() != null) {
            team = teamRepository.findById(driverDTO.getTeamId())
                    .orElseThrow(() -> new ResourceNotFoundException("Team not found with id " + driverDTO.getTeamId()));
        }
        
        driver.setFirstName(driverDTO.getFirstName());
        driver.setLastName(driverDTO.getLastName());
        driver.setCode(driverDTO.getCode());
        driver.setNumber(driverDTO.getNumber());
        driver.setNationality(driverDTO.getNationality());
        driver.setDateOfBirth(driverDTO.getDateOfBirth());
        if (team != null) {
            driver.setTeam(team);
        }
        
        Driver updatedDriver = driverRepository.save(driver);
        return convertToDTO(updatedDriver);
    }
    
    @Transactional
    public void deleteDriver(Long id) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with id " + id));
        driverRepository.delete(driver);
    }
    
    private DriverDTO convertToDTO(Driver driver) {
        return DriverDTO.builder()
                .id(driver.getId())
                .firstName(driver.getFirstName())
                .lastName(driver.getLastName())
                .code(driver.getCode())
                .number(driver.getNumber())
                .nationality(driver.getNationality())
                .dateOfBirth(driver.getDateOfBirth())
                .teamId(driver.getTeam().getId())
                .teamName(driver.getTeam().getName())
                .build();
    }
}
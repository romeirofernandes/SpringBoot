package com.f1.f1_race_explorer.service;

import com.f1.f1_race_explorer.dto.RaceDTO;
import com.f1.f1_race_explorer.exception.ResourceNotFoundException;
import com.f1.f1_race_explorer.model.Circuit;
import com.f1.f1_race_explorer.model.Race;
import com.f1.f1_race_explorer.repository.CircuitRepository;
import com.f1.f1_race_explorer.repository.RaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RaceService {
    
    private final RaceRepository raceRepository;
    private final CircuitRepository circuitRepository;
    
    public List<RaceDTO> getAllRaces() {
        return raceRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public RaceDTO getRaceById(Long id) {
        Race race = raceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Race not found with id " + id));
        return convertToDTO(race);
    }
    
    public List<RaceDTO> getRacesBySeason(int season) {
        return raceRepository.findBySeason(season).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public RaceDTO createRace(RaceDTO raceDTO) {
        Circuit circuit = circuitRepository.findById(raceDTO.getCircuitId())
                .orElseThrow(() -> new ResourceNotFoundException("Circuit not found with id " + raceDTO.getCircuitId()));
        
        Race race = Race.builder()
                .name(raceDTO.getName())
                .season(raceDTO.getSeason())
                .round(raceDTO.getRound())
                .raceDate(raceDTO.getRaceDate())
                .circuit(circuit)
                .build();
        
        Race savedRace = raceRepository.save(race);
        return convertToDTO(savedRace);
    }
    
    @Transactional
    public RaceDTO updateRace(Long id, RaceDTO raceDTO) {
        Race race = raceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Race not found with id " + id));
        
        Circuit circuit = null;
        if (raceDTO.getCircuitId() != null) {
            circuit = circuitRepository.findById(raceDTO.getCircuitId())
                    .orElseThrow(() -> new ResourceNotFoundException("Circuit not found with id " + raceDTO.getCircuitId()));
        }
        
        race.setName(raceDTO.getName());
        race.setSeason(raceDTO.getSeason());
        race.setRound(raceDTO.getRound());
        race.setRaceDate(raceDTO.getRaceDate());
        if (circuit != null) {
            race.setCircuit(circuit);
        }
        
        Race updatedRace = raceRepository.save(race);
        return convertToDTO(updatedRace);
    }
    
    @Transactional
    public void deleteRace(Long id) {
        Race race = raceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Race not found with id " + id));
        raceRepository.delete(race);
    }
    
    private RaceDTO convertToDTO(Race race) {
        return RaceDTO.builder()
                .id(race.getId())
                .name(race.getName())
                .season(race.getSeason())
                .round(race.getRound())
                .raceDate(race.getRaceDate())
                .circuitId(race.getCircuit().getId())
                .circuitName(race.getCircuit().getName())
                .build();
    }
}
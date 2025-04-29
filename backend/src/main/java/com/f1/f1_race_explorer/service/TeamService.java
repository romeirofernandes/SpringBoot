package com.f1.f1_race_explorer.service;

import com.f1.f1_race_explorer.dto.TeamDTO;
import com.f1.f1_race_explorer.exception.ResourceNotFoundException;
import com.f1.f1_race_explorer.model.Team;
import com.f1.f1_race_explorer.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamService {
    
    private final TeamRepository teamRepository;
    
    public List<TeamDTO> getAllTeams() {
        return teamRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public TeamDTO getTeamById(Long id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id " + id));
        return convertToDTO(team);
    }
    
    @Transactional
    public TeamDTO createTeam(TeamDTO teamDTO) {
        Team team = Team.builder()
                .name(teamDTO.getName())
                .nationality(teamDTO.getNationality())
                .build();
        
        Team savedTeam = teamRepository.save(team);
        return convertToDTO(savedTeam);
    }
    
    @Transactional
    public TeamDTO updateTeam(Long id, TeamDTO teamDTO) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id " + id));
        
        team.setName(teamDTO.getName());
        team.setNationality(teamDTO.getNationality());
        
        Team updatedTeam = teamRepository.save(team);
        return convertToDTO(updatedTeam);
    }
    
    @Transactional
    public void deleteTeam(Long id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id " + id));
        teamRepository.delete(team);
    }
    
    private TeamDTO convertToDTO(Team team) {
        return TeamDTO.builder()
                .id(team.getId())
                .name(team.getName())
                .nationality(team.getNationality())
                .build();
    }
}
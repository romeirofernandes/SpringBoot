package com.f1.f1_race_explorer.repository;

import com.f1.f1_race_explorer.model.Race;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RaceRepository extends JpaRepository<Race, Long> {
    List<Race> findBySeason(int season);
    List<Race> findByCircuitId(Long circuitId);
}
package com.f1.f1_race_explorer.repository;

import com.f1.f1_race_explorer.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByRaceId(Long raceId);
    List<Result> findByDriverId(Long driverId);
    Optional<Result> findByRaceIdAndDriverId(Long raceId, Long driverId);
}
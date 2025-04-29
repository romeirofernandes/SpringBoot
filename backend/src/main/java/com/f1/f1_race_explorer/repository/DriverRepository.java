package com.f1.f1_race_explorer.repository;

import com.f1.f1_race_explorer.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    List<Driver> findByTeamId(Long teamId);
    Optional<Driver> findByCode(String code);
}
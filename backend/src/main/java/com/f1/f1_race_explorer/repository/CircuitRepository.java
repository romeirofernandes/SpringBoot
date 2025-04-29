package com.f1.f1_race_explorer.repository;

import com.f1.f1_race_explorer.model.Circuit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CircuitRepository extends JpaRepository<Circuit, Long> {
    List<Circuit> findByCountry(String country);
    Optional<Circuit> findByName(String name);
}
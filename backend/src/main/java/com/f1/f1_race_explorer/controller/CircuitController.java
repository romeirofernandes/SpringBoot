package com.f1.f1_race_explorer.controller;

import com.f1.f1_race_explorer.model.Circuit;
import com.f1.f1_race_explorer.repository.CircuitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/circuits")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CircuitController {

    private final CircuitRepository circuitRepository;

    @GetMapping
    public List<Circuit> getAll() {
        return circuitRepository.findAll();
    }

    @GetMapping("/{id}")
    public Circuit getById(@PathVariable Long id) {
        return circuitRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Circuit create(@RequestBody Circuit circuit) {
        return circuitRepository.save(circuit);
    }

    @PutMapping("/{id}")
    public Circuit update(@PathVariable Long id, @RequestBody Circuit circuit) {
        circuit.setId(id);
        return circuitRepository.save(circuit);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        circuitRepository.deleteById(id);
    }
}

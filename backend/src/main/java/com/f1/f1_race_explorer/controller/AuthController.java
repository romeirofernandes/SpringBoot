package com.f1.f1_race_explorer.controller;

import com.f1.f1_race_explorer.dto.LoginRequest;
import com.f1.f1_race_explorer.dto.RegisterRequest;
import com.f1.f1_race_explorer.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        authService.register(req);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        String token = authService.login(req);
        return ResponseEntity.ok(Map.of("token", token));
    }
}

package com.f1.f1_race_explorer.service;

import com.f1.f1_race_explorer.dto.LoginRequest;
import com.f1.f1_race_explorer.dto.RegisterRequest;
import com.f1.f1_race_explorer.model.User;
import com.f1.f1_race_explorer.repository.UserRepository;
import com.f1.f1_race_explorer.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void register(RegisterRequest req) {
        if (userRepository.findByUsername(req.getUsername()).isPresent())
            throw new RuntimeException("Username already exists");
        User user = User.builder()
                .username(req.getUsername())
                .password(passwordEncoder.encode(req.getPassword()))
                .build();
        userRepository.save(user);
    }

    public String login(LoginRequest req) {
        User user = userRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword()))
            throw new RuntimeException("Invalid credentials");
        return jwtUtil.generateToken(user.getUsername());
    }
}

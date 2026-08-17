package com.example.employee.service;

import com.example.employee.config.JwtService;
import com.example.employee.config.UserDetailsServiceImpl;

import com.example.employee.dto.LoginRequest;
import com.example.employee.dto.LoginResponse;
import com.example.employee.dto.RegisterRequest;
import com.example.employee.dto.RegisterResponse;

import com.example.employee.entity.User;
import com.example.employee.repository.UserRepository;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            UserDetailsServiceImpl userDetailsService,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
    }


    public RegisterResponse register(
            RegisterRequest request) {

        if (userRepository.existsByUsername(
                request.getUsername())) {

            throw new RuntimeException(
                    "Username already exists"
            );
        }

        User user = new User();

        user.setUsername(request.getUsername());

        // NEVER store plain-text password
        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        // Every newly registered user gets USER role
        user.setRole("USER");

        User savedUser =
                userRepository.save(user);

        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getRole()
        );
    }


    public LoginResponse login(
            LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(
                        request.getUsername()
                );

        String token =
                jwtService.generateToken(userDetails);

        String role =
                userDetails.getAuthorities()
                        .iterator()
                        .next()
                        .getAuthority()
                        .replace("ROLE_", "");

        return new LoginResponse(
                token,
                userDetails.getUsername(),
                role
        );
    }
}
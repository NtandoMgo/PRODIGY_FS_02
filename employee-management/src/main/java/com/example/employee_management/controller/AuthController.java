package com.example.employee_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.example.employee_management.dto.LoginRequest;
import com.example.employee_management.dto.RegistrationRequest;
import com.example.employee_management.service.EmsUserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private EmsUserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid registration details. Please check your inputs.");
        }

        boolean isRegistered = userService.registerUser(registrationRequest);
        if (isRegistered) {
            return ResponseEntity.ok("User registered successfully!");
        } else {
            return ResponseEntity.badRequest().body("Registration failed. User may already exist.");
        }
    }

    // @PostMapping("/login")
    // public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
    //     if (userService.loginUser(username, password).isPresent()) {
    //         //  will return JWT
    //         return ResponseEntity.ok("Login successful");
    //     }
    //     return ResponseEntity.status(401).body("Invalid credentials");
    // }

    @PostMapping("/login")
public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
    String usernameOrEmail = loginRequest.getUsername();
    String password = loginRequest.getPassword();
    
    if (userService.loginUser(usernameOrEmail, password).isPresent()) {
        // Here, you would typically generate a JWT and return it
        return ResponseEntity.ok("Login successful");
    }
    return ResponseEntity.status(401).body("Invalid credentials");
}
}

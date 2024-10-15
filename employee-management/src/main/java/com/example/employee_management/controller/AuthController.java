package com.example.employee_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.employee_management.service.EmsUserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private EmsUserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam String username, @RequestParam String email,
                                           @RequestParam String password, @RequestParam(defaultValue = "user") String role) {
        if (userService.userExists(username, email)) {
            return ResponseEntity.badRequest().body("Username or email already exists");
        }

        userService.registerUser(username, email, password, role);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        if (userService.loginUser(username, password).isPresent()) {
            // Here, you would typically generate a JWT and return it
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}

package com.example.employee_management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.employee_management.dto.RegistrationRequest;
import com.example.employee_management.model.EmsUser;
import com.example.employee_management.repository.EmsUserRepository;

import java.util.Optional;

@Service
public class EmsUserService {

    @Autowired
    private EmsUserRepository userRepository;

    // private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // public EmsUser registerUser(String username, String email, String plainPassword, String role) {
    //     String hashedPassword = passwordEncoder.encode(plainPassword);
    //     EmsUser user = new EmsUser();
    //     user.setUsername(username);
    //     user.setEmail(email);
    //     user.setPasswordHash(hashedPassword);
    //     user.setRole(role);
    //     return userRepository.save(user);
    // }

    public boolean registerUser(RegistrationRequest request) {
        // Check if user already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            return false;
        }

        // Encrypt the password before saving
        EmsUser newUser = new EmsUser();
        newUser.setUsername(request.getUsername());
        newUser.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        newUser.setEmail(request.getEmail());

        // Save the new user
        userRepository.save(newUser);
        return true;
    }

    public Optional<EmsUser> loginUser(String usernameOrEmail, String plainPassword) {
        Optional<EmsUser> user = userRepository.findByUsername(usernameOrEmail);
        
        if (user.isEmpty()) {
            user = userRepository.findByEmail(usernameOrEmail);
        }
    
        if (user.isPresent() && passwordEncoder.matches(plainPassword, user.get().getPasswordHash())) {
            return user;
        }
        
        return Optional.empty();
    }

    public boolean userExists(String username, String email) {
        return userRepository.findByUsername(username).isPresent() || userRepository.findByEmail(email).isPresent();
    }
}
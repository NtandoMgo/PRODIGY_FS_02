package com.example.employee_management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.employee_management.model.EmsUser;
import com.example.employee_management.repository.EmsUserRepository;

import java.util.Optional;

@Service
public class EmsUserService {

    @Autowired
    private EmsUserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public EmsUser registerUser(String username, String email, String plainPassword, String role) {
        String hashedPassword = passwordEncoder.encode(plainPassword);
        EmsUser user = new EmsUser();
        user.setUsername(username);
        user.setEmail(email);
        user.setPasswordHash(hashedPassword);
        user.setRole(role);
        return userRepository.save(user);
    }

    public Optional<EmsUser> loginUser(String username, String plainPassword) {
        Optional<EmsUser> user = userRepository.findByUsername(username);
        if (user.isPresent() && passwordEncoder.matches(plainPassword, user.get().getPasswordHash())) {
            return user;
        }
        return Optional.empty();
    }

    public boolean userExists(String username, String email) {
        return userRepository.findByUsername(username).isPresent() || userRepository.findByEmail(email).isPresent();
    }
}
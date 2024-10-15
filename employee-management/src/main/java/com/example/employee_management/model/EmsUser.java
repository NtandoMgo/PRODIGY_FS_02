package com.example.employee_management.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ems_users")
public class EmsUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String passwordHash;

    @Column(unique = true, nullable = false)
    private String email;

    private String role;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors, getters, and setters
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void setUsername(String username2) {
        username = username2;
    }

    public void setEmail(String email2) {
        email = email2;
    }

    public void setPasswordHash(String hashedPassword) {
        passwordHash = hashedPassword;
    }

    public void setRole(String role2) {
        role = role2;
    }

    public String getPasswordHash() {
        return passwordHash;
    }
}


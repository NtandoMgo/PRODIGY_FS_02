package com.example.employee_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.employee_management.model.EmsUser;

import java.util.Optional;

public interface EmsUserRepository extends JpaRepository<EmsUser, Long> {
    Optional<EmsUser> findByUsername(String username);
    Optional<EmsUser> findByEmail(String email);
}

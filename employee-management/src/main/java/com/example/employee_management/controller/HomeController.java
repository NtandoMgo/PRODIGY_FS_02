package com.example.employee_management.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/login")
    public String login() {
        return "login"; // Return the login.html view
    }

    @GetMapping("/")
    public String home() {
        return "Welcome to the Employee Management Application!";
    }
}

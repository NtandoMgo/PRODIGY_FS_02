package com.example.employee_management.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {

    @GetMapping("/login")
    public String login() {
        return "login"; // The name of the login view (login.html)
    }

    // not creating any admins...registration form
    /*
    @GetMapping("/register")
    public String register() {
        return "register"; // The name of the registration view
    }
    */
}
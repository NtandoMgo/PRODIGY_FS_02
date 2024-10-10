package com.example.employee_management;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService emplService;

    @GetMapping
    public List<Employee> allEmployees() {
        return emplService.getAllEmployees();
    }

    @PostMapping
    public Employee createEmployee(@RequestBody Employee anEmployee) {
        return emplService.createEmployee(anEmployee);
    }
}

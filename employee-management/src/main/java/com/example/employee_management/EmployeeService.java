package com.example.employee_management;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository emplRepository;

    public List<Employee> getAllEmployees() {
        return emplRepository.findAll();
    }

    public Employee createEmployee(Employee anEmpl) {
        return emplRepository.save(anEmpl);
    }
}

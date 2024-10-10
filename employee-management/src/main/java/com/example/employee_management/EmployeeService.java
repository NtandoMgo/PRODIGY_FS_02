package com.example.employee_management;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    public Employee updateEmployee (Long id, Employee anEmpl) {
        Optional<Employee> existingEmpl = emplRepository.findById(id);
        if (existingEmpl.isPresent()) {
            anEmpl.setId(id);
            return emplRepository.save(anEmpl);
        }
        return null;    //case where employee does not exist
    }

    public void deleteEmployee(Long id) {
        emplRepository.deleteById(id);
    }
}

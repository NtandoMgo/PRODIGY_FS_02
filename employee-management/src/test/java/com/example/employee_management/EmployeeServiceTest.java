package com.example.employee_management;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class EmployeeServiceTest {
    @InjectMocks
    private EmployeeService employeeService;

    @Mock
    private EmployeeRepository employeeRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllEmployees() {
        Employee empl1 = new Employee("Ntando Mngo", "ntara@test.com", "Developer");
        Employee empl2 = new Employee("Ntando Mngomezulu", "ntaramngo@test.com", "Tester");
        when(employeeRepository.findAll()).thenReturn(Arrays.asList(empl1, empl2));

        List<Employee> employees = employeeService.getAllEmployees();
        assertEquals(2, employees.size());
    }

    @Test
    void testCreateEmployee() {
        Employee emp = new Employee("Ntando Mngo", "ntara@test.com", "Developer");
        when(employeeRepository.save(emp)).thenReturn(emp);

        Employee created = employeeService.createEmployee(emp);
        assertNotNull(created);
        assertEquals("Ntando Mngo", created.getName());
    }
}

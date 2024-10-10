package com.example.employee_management;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import java.util.Optional;
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

    @Test
    void testUpdateEmployee() {
        Long id = 1L;

        Employee existingEmpl = new Employee("Ntando Dlakadla", "ntara@test.com", "Developer");
        Employee updatedEmpl = new Employee("Ntando Mngosh", "ntaramngo@test.com", "Senior Tester");

        when(employeeRepository.findById(id)).thenReturn(Optional.of(existingEmpl));
        when(employeeRepository.save(existingEmpl)).thenReturn(updatedEmpl);

        Employee result = employeeService.updateEmployee(id, updatedEmpl);

        assertEquals("Ntando Mngosh", result.getName());
        assertEquals("ntaramngo@test.com", result.getEmail());
    }

    @Test
void testDeleteEmployee() {
    Long id = 1L;
    Employee empl = new Employee("Khaya Zulu", "zkhaya@example.co.za", "Manager");

    when(employeeRepository.existsById(id)).thenReturn(true);
    
    assertDoesNotThrow(() -> employeeService.deleteEmployee(id));
    verify(employeeRepository, times(1)).deleteById(id);
}

@Test
void testDeleteEmployeeNotFound() {
    Long id = 1L;

    when(employeeRepository.existsById(id)).thenReturn(false);
    
    Exception exception = assertThrows(RuntimeException.class, () -> {
        employeeService.deleteEmployee(id);
    });
    
    assertEquals("Employee not found (d)", exception.getMessage());
}
}

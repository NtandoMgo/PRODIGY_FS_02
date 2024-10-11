import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await EmployeeService.getAllEmployees();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const handleCreate = async () => {
    const createdEmployee = await EmployeeService.createEmployee(newEmployee);
    setEmployees([...employees, createdEmployee]);
    setNewEmployee({name: "", email: "", role: ""});    // reset the input
  };

  const handleDelete = async (id) => {
    await EmployeeService.deleteEmployee(id);
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name} - {emp.email} - {emp.role}
            <button onClick={() => handleDelete(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Add Employee</h3>
      <input
        type="text"
        placeholder="Name"
        value={newEmployee.name}
        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newEmployee.email}
        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Role"
        value={newEmployee.role}
        onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
      />
      <button onClick={handleCreate}>Add Employee</button>
    </div>
  );
};

export default EmployeeList;

import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import '../styles/EmployeeList.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        name: "",
        email: "",
        role: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentEmployeeId, setCurrentEmployeeId] = useState(null);

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
        resetForm();
    };

    const handleEdit = async (employee) => {
        setNewEmployee(employee);
        setIsEditing(true);
        setCurrentEmployeeId(employee.id);
    };

    const handleUpdate = async () => {
        const updatedEmployee = await EmployeeService.updateEmployee(currentEmployeeId, newEmployee);
        setEmployees(employees.map(emp => (emp.id === currentEmployeeId ? updatedEmployee : emp)));
        resetForm();
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (confirmDelete) {
            await EmployeeService.deleteEmployee(id);
            setEmployees(employees.filter(emp => emp.id !== id));
        }
    };

    const resetForm = () => {
        setNewEmployee({ name: "", email: "", role: "" });
        setIsEditing(false);
        setCurrentEmployeeId(null);
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Employee List</h2>
            <div className="card">
                <ul className="list-group list-group-flush">
                    {employees.map(emp => (
                        <li key={emp.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{emp.name}</strong> - {emp.email} - <span className="badge bg-info text-dark">{emp.role}</span>
                            </div>
                            <div>
                                <button className="btn btn-edit me-2" onClick={() => handleEdit(emp)}>Edit</button>
                                <button className="btn btn-delete" onClick={() => handleDelete(emp.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <h3 className="text-center mt-4">{isEditing ? "Edit Employee" : "Add Employee"}</h3>
            <div className="card p-3">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Role"
                        value={newEmployee.role}
                        onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                    />
                </div>
                <button className="btn btn-primary w-100" onClick={isEditing ? handleUpdate : handleCreate}>
                    {isEditing ? "Update Employee" : "Add Employee"}
                </button>
                {isEditing && (
                    <button className="btn btn-secondary w-100 mt-2" onClick={resetForm}>
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default EmployeeList;

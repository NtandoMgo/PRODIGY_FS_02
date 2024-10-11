import React from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/employees"; // connection to backend- api

const EmployeeService = {
  getAllEmployees: async () => {
    const response = await axios.get(API_URL, {
      auth: { username: "admin", password: "password" },
    });
    return response.data;
  },

  createEmployee: async (employee) => {
    const response = await axios.post(API_URL, employee, {
      auth: { username: "admin", password: "password" },
    });
    return response.data;
  },

  updateEmployee: async (id, employee) => {
    const response = await axios.put(`${API_URL}/${id}`, employee, {
      auth: { username: "admin", password: "password" },
    });
    return response.data;
  },

  deleteEmployee: async (id) => {
    await axios.delete(`${API_URL}/${id}`, {
      auth: { username: "admin", password: "password" },
    });
  },
};

export default EmployeeService;

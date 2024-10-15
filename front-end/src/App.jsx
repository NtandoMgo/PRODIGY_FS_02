import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Only import Routes and Route
import './App.css';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check local storage to see if the user is logged in (e.g., token is stored)
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employee-form" element={<EmployeeForm />} />
            </Routes>
        </>
    );
}

export default App;

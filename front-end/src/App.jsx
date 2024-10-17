import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Logout from './components/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check local storage to see if the user is logged in (e.g., token is stored)
        const token = localStorage.getItem('user');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </>
    );
}

export default App;

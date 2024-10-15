// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';

function App() {
    return (
        <>
            <p>Employee Management System</p>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/employees" element={<EmployeeList />} />
            </Routes>
        </>
    );
}

export default App;

import React from 'react';
import { logout } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
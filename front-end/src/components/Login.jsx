import React, { useState } from 'react';
import axios from '../services/axiosConfig.js';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', { 
                username, 
                password 
            });
            setMessage(response.data);
            localStorage.setItem('token', response.data.token); // Assuming the response contains a token
            navigate('/employees'); // Use navigate to redirect
        } catch (error) {
            setMessage('Invalid credentials. Please try again.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
            <p>{message}</p>
        </form>
    );
}

export default Login;

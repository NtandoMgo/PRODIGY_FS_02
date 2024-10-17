import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log({ username, password }); // Log the payload for debugging
            const user = await login(username, password); // Pass as separate arguments
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/employees');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3">
    <div className="mb-3">
        <input
            type="text"
            className="form-control"
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
    </div>
    <div className="mb-3">
        <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
    </div>
    <button type="submit" className="btn btn-primary">Login</button>
</form>

    );
};

export default Login;

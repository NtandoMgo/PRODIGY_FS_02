import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService';
import '../styles/Login.css'; // Add this line to import custom styles

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(username, password);
            localStorage.setItem('user', JSON.stringify(user));
            setIsLoggedIn(true);
            navigate('/employees');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="text-center mb-4">Login</h2>
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
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    const [showHelp, setShowHelp] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove the user data from local storage
        setIsLoggedIn(false); // Update login state
        navigate('/login'); // Redirect to the login page
    };

    const toggleHelp = () => {
        setShowHelp(!showHelp);
    };

    return (
        <nav>
            <h1 className="logo">Employee Management System</h1>
            <ul className="nav-buttons">
                {isLoggedIn ? (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    <>
                        <li>
                            <button onClick={() => navigate('/login')}>Login</button>
                        </li>
                        <li>
                            <button onClick={() => navigate('/register')}>Register</button>
                        </li>
                    </>
                )}
                <li>
                    <button onClick={toggleHelp} className="help-btn">Help</button>
                </li>
            </ul>
            {showHelp && (
                <div className="help-popup">
                    <div className="help-content">
                        <h4>Navigation Help</h4>
                        <p>- Use "Login" to access your account.</p>
                        <p>- "Register" to create a new account.</p>
                        <p>- Once logged in, use "Logout" to sign out.</p>
                        <button onClick={toggleHelp} className="close-btn">Close</button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;

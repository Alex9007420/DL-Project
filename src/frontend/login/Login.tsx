import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './auth'; // Assuming login is a function that handles API calls and stores the token
import "./Login.css"

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            const success = await login(username, password); // Call your login function
            if (success) {
                navigate('/submit'); // Redirect to submit page if login is successful
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            console.error("Login failed:", error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className = "login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;

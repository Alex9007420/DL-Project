import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Register.css";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const payload = {
                username,
                password,
                email,
                first_name: firstName,
                last_name: lastName
            };
            await axios.post('http://127.0.0.1:8000/api/register/', payload);
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            const err = error as Error & { response?: { data: { error: string }, status: number } };
            if (err.response && err.response.data.error) {
                setError(`Registration failed: ${err.response.data.error}`);
            } else if (err.response && err.response.status) {
                setError(`Registration failed: Server responded with status ${err.response.status}`);
            } else {
                setError('Registration failed: An unexpected error occurred');
            }
        }
    };

    return (
        <div className = "registration-container">
            <h2>Register</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
            />
            <button onClick={handleRegister}>Register</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Register;

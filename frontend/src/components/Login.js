import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { setAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Import the CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');  // Role state added
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
        role,   // Include role in request payload
      });

      const token = response.data.token;

      // Decode token to get user info (id, role)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const { id, role: userRole } = payload;

      // Store token and set header
      localStorage.setItem('token', token);
      setAuthToken(token);

      // Store user in AuthContext
      login({ id, role: userRole, token });

      // Redirect
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label><br />
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="base_commander">Base Commander</option>
            <option value="logistics_officer">Logistics Officer</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

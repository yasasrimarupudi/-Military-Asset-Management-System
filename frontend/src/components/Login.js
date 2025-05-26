import React, { useState, useContext } from 'react';
import api, { setAuthToken } from '../services/api'; // ✅ Use api instance
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
        role,
      });

      const token = response.data.token;
      const payload = JSON.parse(atob(token.split('.')[1]));
      const { id, role: userRole } = payload;

      localStorage.setItem('token', token);
      setAuthToken(token);
      login({ id, role: userRole, token });

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
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Role:</label><br />
          <select value={role} onChange={e => setRole(e.target.value)} required>
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { setAuthToken } from './services/api';

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token); // Ensure Axios has token on reload
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

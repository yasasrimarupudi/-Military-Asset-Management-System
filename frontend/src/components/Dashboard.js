// src/components/Dashboard.js
import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await api.get('/assets/dashboard');
        setMetrics(res.data);
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setError('Access denied. You are not authorized to view this dashboard.');
        } else if (err.response && err.response.status === 401) {
          setError('Unauthorized. Please login again.');
        } else {
          setError('Failed to load dashboard data.');
        }
      }
    }
    fetchMetrics();
  }, []);

  const textStyle = { color: 'black', fontWeight: '700' };

  if (error) return <p style={{ color: 'red', fontWeight: '700' }}>{error}</p>;
  if (!metrics) return <p style={textStyle}>Loading...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={textStyle}>Asset Dashboard</h2>
      <p style={textStyle}><strong>Opening Balance:</strong> {metrics.openingBalance}</p>
      <p style={textStyle}><strong>Closing Balance:</strong> {metrics.closingBalance}</p>
      <p style={textStyle}><strong>Net Movement:</strong> {metrics.netMovement}</p>
      <p style={textStyle}><strong>Assigned Assets:</strong> {metrics.assigned}</p>
      <p style={textStyle}><strong>Expended Assets:</strong> {metrics.expended}</p>
    </div>
  );
}

export default Dashboard;

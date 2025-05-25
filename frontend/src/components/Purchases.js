import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPurchases() {
      try {
        const res = await api.get('/purchases');
        // Adjust this line based on your API's response structure
        const data = Array.isArray(res.data) ? res.data : res.data.purchases || [];
        setPurchases(data);
      } catch {
        setError('Failed to fetch purchases');
      }
    }
    fetchPurchases();
  }, []);

  const textStyle = { color: 'black', fontWeight: '700', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" };

  return (
    <div style={{ padding: '20px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={textStyle}>Purchases</h2>
      {error && <p style={{ ...textStyle, color: 'red', fontWeight: '700' }}>{error}</p>}
      <ul style={{ ...textStyle, listStyleType: 'disc', paddingLeft: '20px' }}>
        {purchases.length === 0 ? (
          <li style={textStyle}>No purchases found.</li>
        ) : (
          purchases.map(p => (
            <li key={p.id || p._id} style={textStyle}>
              {p.date} - {p.assetName} - Qty: {p.quantity} - Base: {p.base}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Purchases;

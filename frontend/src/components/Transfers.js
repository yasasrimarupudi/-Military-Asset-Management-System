import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const [form, setForm] = useState({
    asset_id: '',
    from_base_id: '',
    to_base_id: '',
    quantity: ''
  });

  useEffect(() => {
    async function fetchTransfers() {
      try {
        const res = await api.get('/transfers');
        setTransfers(res.data);
      } catch {
        alert('Failed to fetch transfer history');
      }
    }
    fetchTransfers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/transfers', form);
      alert('Transfer successful');
      setForm({ asset_id: '', from_base_id: '', to_base_id: '', quantity: '' });
    } catch {
      alert('Transfer failed');
    }
  };

  const textStyle = { color: 'black', fontWeight: '700', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" };
  const inputStyle = { fontWeight: '700', color: 'black', padding: '8px', margin: '5px 0', width: '100%', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' };
  const buttonStyle = { fontWeight: '700', color: 'white', backgroundColor: '#333', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' };
  const historyTextStyle = { color: 'red', fontWeight: '700', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2 style={textStyle}>Transfers Page</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="asset_id"
          placeholder="Asset ID"
          onChange={handleChange}
          value={form.asset_id}
          required
          style={inputStyle}
        />
        <input
          name="from_base_id"
          placeholder="From Base ID"
          onChange={handleChange}
          value={form.from_base_id}
          required
          style={inputStyle}
        />
        <input
          name="to_base_id"
          placeholder="To Base ID"
          onChange={handleChange}
          value={form.to_base_id}
          required
          style={inputStyle}
        />
        <input
          name="quantity"
          placeholder="Quantity"
          onChange={handleChange}
          value={form.quantity}
          required
          style={inputStyle}
          type="number"
          min="1"
        />
        <button type="submit" style={buttonStyle}>Transfer</button>
      </form>

      <h3 style={{ ...textStyle, marginTop: '30px' }}>Transfer History</h3>
      <ul style={historyTextStyle}>
        {transfers.length === 0 && <li>No transfer records found.</li>}
        {transfers.map(t => (
          <li key={t.id} style={{ marginBottom: '10px' }}>
            Asset {t.asset_id} transferred from Base {t.from_base_id} to Base {t.to_base_id} (Qty: {t.quantity}) on {new Date(t.transfer_date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transfers;

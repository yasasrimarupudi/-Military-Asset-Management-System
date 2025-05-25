import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { setAuthToken } from '../services/api';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setAuthToken(null);
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '12px 24px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',  // semi-transparent dark background
        boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: 'flex',
        alignItems: 'center',
        backdropFilter: 'blur(6px)',  // subtle blur behind navbar
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <Link
          to="/dashboard"
          style={{
            marginRight: 24,
            textDecoration: 'none',
            color: '#fff',
            fontWeight: '600',
            fontSize: '1rem',
            textShadow: '0 0 5px rgba(0,0,0,0.8)',
          }}
        >
          Dashboard
        </Link>
        {(user.role === 'admin' || user.role === 'logistics') && (
          <>
            <Link
              to="/purchases"
              style={{
                marginRight: 24,
                textDecoration: 'none',
                color: '#fff',
                fontWeight: '600',
                fontSize: '1rem',
                textShadow: '0 0 5px rgba(0,0,0,0.8)',
              }}
            >
              Purchases
            </Link>
            <Link
              to="/transfers"
              style={{
                marginRight: 24,
                textDecoration: 'none',
                color: '#fff',
                fontWeight: '600',
                fontSize: '1rem',
                textShadow: '0 0 5px rgba(0,0,0,0.8)',
              }}
            >
              Transfers
            </Link>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={handleLogout}
        style={{
          backgroundColor: '#e74c3c',
          border: 'none',
          color: 'white',
          padding: '8px 18px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '0.9rem',
          transition: 'background-color 0.3s ease',
          boxShadow: '0 0 5px rgba(0,0,0,0.7)',
          textShadow: '0 0 2px rgba(0,0,0,0.8)',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c0392b')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#e74c3c')}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;

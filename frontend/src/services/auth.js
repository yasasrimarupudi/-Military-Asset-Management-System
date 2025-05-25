// services/auth.js
import axios from './api';

export const loginUser = async (credentials) => {
  const response = await axios.post('/auth/login', credentials);
  const token = response.data.token;

  const payload = JSON.parse(atob(token.split('.')[1])); // decode JWT payload
  return { token, user: payload }; // ⬅️ now returns user info too
};

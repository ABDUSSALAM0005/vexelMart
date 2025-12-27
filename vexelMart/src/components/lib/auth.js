import api from '../lib/axios';

// Login User
export const login = async (email, password) => {
  const response = await api.post('/user/login', { email, password });
  return response.data;
};

// Register User
export const register = async (name, email, password) => {
  const response = await api.post('/user/register', { name, email, password });
  return response.data;
};

// Logout (Optional: call backend if you track sessions there)
export const logout = () => {
  // Clear local storage here or in the Context
  localStorage.removeItem('userInfo');
};
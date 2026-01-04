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

// Create a new order
export const createOrder = async (orderData) => {
  const { data } = await api.post('/orders', orderData);
  return data;
};

export const getOrderDetails = async (id) => {
  const { data } = await api.get(`/orders/${id}`)
  return data;
 }

 // Update order to paid
export const payOrder = async (orderId, paymentResult) => {
  // This calls PUT /api/orders/:id/pay
  const { data } = await api.put(`/orders/${orderId}/pay`, paymentResult);
  return data;
};

// Get logged in user's orders
export const listMyOrders = async () => {
  const { data } = await api.get('/orders/myorders');
  return data;
};

// Update User Profile (Optional, if you want them to change password later)
export const updateUserProfile = async (user) => {
  const { data } = await api.put('/user/profile', user);
  return data;
};
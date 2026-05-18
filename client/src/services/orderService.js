import api from './authService';

export const createOrder = async (items, totalAmount) => {
  const response = await api.post('/orders', { items, totalAmount });
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await api.patch(`/orders/${orderId}`, { status });
  return response.data;
};

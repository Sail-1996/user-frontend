import axios from 'axios';

const API_URL = 'http://localhost:4000/orders/';

export const fetchOrders = () => axios.get(API_URL);
export const addOrder = (order) => axios.post(`${API_URL}`, order);
export const updateOrder = (id, order) => axios.put(`${API_URL}${id}`, order);
export const deleteOrder = (id) => axios.delete(`${API_URL}${id}`);
export const updateOrderStatus = (id, status) => 
  axios.patch(`${API_URL}${id}`, { status });

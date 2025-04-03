import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
} from '../api/ordersApi';

// Async Thunks
export const getOrders = createAsyncThunk('orders/getOrders', async () => {
  const response = await fetchOrders();
  return response.data;
});

export const createOrder = createAsyncThunk('orders/createOrder', async (order) => {
  const response = await addOrder(order);
  return response.data;
});
export const cancelOrder = createAsyncThunk('orders/cancelOrder', async (orderId) => {
  await fetch(`http://localhost:4000/orders/${orderId}`, { method: 'DELETE' });
  return orderId;
});

export const modifyOrder = createAsyncThunk('orders/modifyOrder', async ({ id, order }) => {
  const response = await updateOrder(id, order);
  return response.data;
});

export const removeOrder = createAsyncThunk('orders/removeOrder', async (id) => {
  await deleteOrder(id);
  return id;
});

export const changeOrderStatus = createAsyncThunk('orders/changeOrderStatus', async ({ id, status }) => {
  const response = await updateOrderStatus(id, status);
  return response.data;
});

// Initial State
const initialState = {
  orders: [],
  status: 'idle',
  error: null,
  loading: false
};

// Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(order => order.id !== action.payload);
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(modifyOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(order => order.id !== action.payload);
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        state.orders = state.orders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      });
  },
});

export const selectAllOrders = (state) => state.orders.orders;
export const selectOrderById = (state, id) =>
  state.orders.orders.find((order) => order.id === id);

export default orderSlice.reducer;

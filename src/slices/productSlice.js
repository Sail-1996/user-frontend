import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for fetching products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page, category, search }) => {
      const categoryParam = category && category !== 'All' ? `&category=${category}` : '';
      const searchParam = search ? `&search=${search}` : '';
      const response = await axios.get(`http://localhost:4000/products?page=${page}${categoryParam}${searchParam}`);
      return response.data;
    }
  );
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    page: 1,
    hasMore: true, // Flag to track if there are more products
    selectedCategory: 'All',
  },
  reducers: {
    resetProducts: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.length === 0) {
          state.hasMore = false; // No more products to load
        } else {
          state.items = [...state.items, ...action.payload]; // Append new items
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetProducts, setCategory, incrementPage, setHasMore } = productSlice.actions;

export default productSlice.reducer;

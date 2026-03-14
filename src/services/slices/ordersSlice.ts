import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchProfileOrders } from '../actions/orders';

const initialState = {
  orders: [] as TOrder[],
  isLoading: false,
  error: null as string | null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        (state.isLoading = false),
          (state.error = action.error.message || 'Ошибка загрузки');
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        (state.isLoading = false), (state.orders = action.payload);
      });
  }
});

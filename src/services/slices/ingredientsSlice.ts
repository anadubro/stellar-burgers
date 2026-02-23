import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from '../actions/ingredients';

const initialState = {
  ingredients: [] as TIngredient[],
  isLoading: false,
  error: null as string | null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

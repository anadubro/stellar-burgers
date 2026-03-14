import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async () => await getIngredientsApi()
);

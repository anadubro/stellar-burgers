import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';

export const fetchFeeds = createAsyncThunk(
  'feed/fetchAll',
  async () => await getFeedsApi()
);

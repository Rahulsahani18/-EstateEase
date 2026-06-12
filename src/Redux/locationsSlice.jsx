// src/Redux/locationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const API_URL = '/api/locations';

export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  data: [],        // This will store only the locations array
  status: 'idle',
  error: null,
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data; // Extract only the data array
        state.error = null;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default locationsSlice.reducer;
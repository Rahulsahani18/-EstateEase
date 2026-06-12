// src/Redux/propertyTypesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/propertyType';

export const fetchPropertyTypes = createAsyncThunk(
  'propertyTypes/fetchPropertyTypes',
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
  data: [],        // This will store only the property types array
  status: 'idle',
  error: null,
};

const propertyTypesSlice = createSlice({
  name: 'propertyTypes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPropertyTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data; // Extract only the data array
        state.error = null;
      })
      .addCase(fetchPropertyTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default propertyTypesSlice.reducer;
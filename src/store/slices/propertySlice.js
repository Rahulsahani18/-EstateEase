import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  searchFilters: {
    type: 'Property Type',
    region: 'Region',
    price: 'Price',
    beds: 'Bedrooms',
    baths: 'Bathrooms',
    minSize: '',
    status: 'All',
    query: '',
    minPrice: '',
    maxPrice: '',
  },
  selectedProperty: null,
  isEnquiryModalOpen: false,
  status: 'idle',
  error: null,
};

export const fetchProperties = createAsyncThunk('properties/fetchProperties', async () => {
  const response = await fetch('/db.json');
  const data = await response.json();
  return data.properties;
});

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setSearchFilters: (state, action) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    setEnquiryModalOpen: (state, action) => {
      state.isEnquiryModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch properties';
      });
  },
});

export const { setSearchFilters, setSelectedProperty, setEnquiryModalOpen } = propertySlice.actions;
export default propertySlice.reducer;

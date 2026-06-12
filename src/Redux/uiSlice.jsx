// src/Redux/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isEnquiryModalOpen: false,
  selectedProperty: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setEnquiryModalOpen: (state, action) => {
      state.isEnquiryModalOpen = action.payload;
    },
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    closeEnquiryModal: (state) => {
      state.isEnquiryModalOpen = false;
      state.selectedProperty = null;
    },
  },
});

export const { setEnquiryModalOpen, setSelectedProperty, closeEnquiryModal } = uiSlice.actions;
export default uiSlice.reducer;
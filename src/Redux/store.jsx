// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from '../Redux/propertiesSlice';
import locationsReducer from '../Redux/locationsSlice';
import propertyTypesReducer from '../Redux/propertyTypesSlice';
// import uiReducer from '../Redux/uiSlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    locations: locationsReducer,
    propertyTypes: propertyTypesReducer,
    // ui: uiReducer,
  },
});
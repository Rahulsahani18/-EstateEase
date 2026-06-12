// src/hooks/useInitialData.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../Redux/propertiesSlice';
import { fetchLocations } from '../Redux/locationsSlice';
import { fetchPropertyTypes } from '../Redux/propertyTypesSlice';

export const useInitialData = () => {
  const dispatch = useDispatch();
  
  // Get current states
  const properties = useSelector((state) => state.properties);
  const locations = useSelector((state) => state.locations);
  const propertyTypes = useSelector((state) => state.propertyTypes);

  useEffect(() => {
    // Only fetch if data is empty and not currently loading
    if (properties.status === 'idle' && properties.data.length === 0) {
      dispatch(fetchProperties());
    }
    if (locations.status === 'idle' && locations.data.length === 0) {
      dispatch(fetchLocations());
    }
    if (propertyTypes.status === 'idle' && propertyTypes.data.length === 0) {
      dispatch(fetchPropertyTypes());
    }
  }, [dispatch, properties.status, locations.status, propertyTypes.status]);

  // Calculate loading and error states
  const isLoading = properties.status === 'loading' || 
                    locations.status === 'loading' || 
                    propertyTypes.status === 'loading';
  
  const hasError = properties.status === 'failed' || 
                   locations.status === 'failed' || 
                   propertyTypes.status === 'failed';

  const error = properties.error || locations.error || propertyTypes.error;

  return {
    isLoading,
    hasError,
    error,
    properties: properties.data,
    locations: locations.data,
    propertyTypes: propertyTypes.data,
    propertiesStatus: properties.status,
    locationsStatus: locations.status,
    propertyTypesStatus: propertyTypes.status,
  };
};
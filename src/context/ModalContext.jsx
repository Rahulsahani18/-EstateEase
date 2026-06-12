// src/context/ModalContext.jsx
import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const openEnquiryModal = (property) => {
    setSelectedProperty(property);
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
    setSelectedProperty(null);
  };

  return (
    <ModalContext.Provider value={{
      isEnquiryModalOpen,
      selectedProperty,
      openEnquiryModal,
      closeEnquiryModal,
      setSelectedProperty,
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
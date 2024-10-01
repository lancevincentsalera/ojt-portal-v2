import React, { createContext, useState, useContext } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  return (
    <GlobalStateContext.Provider value={{ isLoading, setIsLoading, error, setError, success, setSuccess, apiBaseUrl }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);

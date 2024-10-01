import React, { createContext, useState, useContext, useEffect } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  
  const [allowPath, setAllowPath] = useState(() => {
    return JSON.parse(localStorage.getItem("allowPath")) || false;
  });

  useEffect(() => {
    localStorage.setItem("allowPath", JSON.stringify(allowPath));
  }, [allowPath]);

  return (
    <GlobalStateContext.Provider value={{ isLoading, setIsLoading, error, setError, success, setSuccess, apiBaseUrl, allowPath, setAllowPath }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);

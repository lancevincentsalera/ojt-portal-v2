import React, { useState, useContext } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [authUser, setAuthUserState] = useState(() => {
    const savedAuthUser = localStorage.getItem("authUser");
    return savedAuthUser ? JSON.parse(savedAuthUser) : null;
  });
  const [isLoggedIn, setIsLoggedInState] = useState(() => {
    const savedLoginState = localStorage.getItem("isLoggedIn");
    return JSON.parse(savedLoginState);
  });

  const setAuthUser = (userData) => {
    localStorage.setItem("authUser", JSON.stringify(userData));
    setAuthUserState(userData);
  };

  const setIsLoggedIn = (loggedIn) => {
    localStorage.setItem("isLoggedIn", loggedIn);
    setIsLoggedInState(loggedIn);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedIn(null);
    setAuthUser(null);
  };

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

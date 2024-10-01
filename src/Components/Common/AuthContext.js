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

  const [userInfo, setUserInfoState] = useState(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    return savedUserInfo ? JSON.parse(savedUserInfo) : null;
  });

  const [isLoggedIn, setIsLoggedInState] = useState(() => {
    const savedLoginState = localStorage.getItem("isLoggedIn");
    return JSON.parse(savedLoginState);
  });

  const setAuthUser = (tokenData, userData) => {
    localStorage.setItem("authUser", JSON.stringify(tokenData)); 
    localStorage.setItem("userInfo", JSON.stringify(userData)); 
    setAuthUserState(tokenData); 
    setUserInfoState(userData); 
  };

  const setIsLoggedIn = (loggedIn) => {
    localStorage.setItem("isLoggedIn", loggedIn);
    setIsLoggedInState(loggedIn);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedIn(null);
    setAuthUserState(null);
    setUserInfoState(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isLoggedIn");
  };

  const value = {
    authUser,   
    userInfo,   
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}

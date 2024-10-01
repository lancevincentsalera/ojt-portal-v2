import React, { useState, useContext } from "react";
import Cookies from "js-cookie"; // Import the js-cookie library

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [authUser, setAuthUserState] = useState(() => {
    const savedAuthUser = Cookies.get("authUser");
    return savedAuthUser ? JSON.parse(savedAuthUser) : null;
  });

  const [userInfo, setUserInfoState] = useState(() => {
    const savedUserInfo = Cookies.get("userInfo");
    return savedUserInfo ? JSON.parse(savedUserInfo) : null;
  });

  const [isLoggedIn, setIsLoggedInState] = useState(() => {
    const savedLoginState = Cookies.get("isLoggedIn");
    return savedLoginState === "true"; 
  });

  const setAuthUser = (tokenData, userData) => {
    Cookies.set("authUser", JSON.stringify(tokenData), { expires: 7 }); 
    Cookies.set("userInfo", JSON.stringify(userData), { expires: 7 });

    setAuthUserState(tokenData);
    setUserInfoState(userData);
  };

  const setIsLoggedIn = (loggedIn) => {
    Cookies.set("isLoggedIn", loggedIn ? "true" : "false", { expires: 7 });
    
    setIsLoggedInState(loggedIn);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    setAuthUserState(null);
    setUserInfoState(null);

    Cookies.remove("authUser");
    Cookies.remove("userInfo");
    Cookies.remove("isLoggedIn");
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

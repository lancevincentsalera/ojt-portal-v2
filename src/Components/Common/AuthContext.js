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

  const [timeIn, setTimeInState] = useState(() => {
    const savedTimeIn = Cookies.get("timeIn");
    return savedTimeIn || null;
  });

  const [timeOut, setTimeOutState] = useState(() => {
    const savedTimeOut = Cookies.get("timeOut");
    return savedTimeOut || null;
  });

  const getNextMidnight = () => {
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    ); // Midnight next day
    return tomorrow;
  };

  const setTimeIn = (timeInValue) => {
    const expiration = getNextMidnight();
    Cookies.set("timeIn", timeInValue, { expires: expiration });
    setTimeInState(timeInValue);
  };

  const setTimeOut = (timeOutValue) => {
    const expiration = getNextMidnight();
    Cookies.set("timeOut", timeOutValue, { expires: expiration });
    setTimeOutState(timeOutValue);
  };

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

    setIsLoggedInState(false);
    setAuthUserState(null);
    setUserInfoState(null);
    setTimeInState(null);
    setTimeOutState(null);

    Cookies.remove("authUser");
    Cookies.remove("userInfo");
    Cookies.remove("isLoggedIn");
    Cookies.remove("timeIn");
    Cookies.remove("timeOut");
  };

  const value = {
    authUser,
    userInfo,
    timeIn,
    timeOut,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    setTimeIn,
    setTimeOut,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

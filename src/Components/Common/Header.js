import React from "react";
import { FaGraduationCap, FaUserCircle } from "react-icons/fa";
import { useAuth } from "./AuthContext";

const Header = () => {
  const { userInfo } = useAuth();

  return (
    <header className="Header">
      <div className="header-title">
        <FaGraduationCap size={30} />
        &ensp;
        <span>OJT Management Portal</span>
      </div>
      {
        userInfo &&
        <div className="header-user">
          {
            userInfo.userType === "Admin" ? (
              <span className="user-name">{userInfo.firstName} {userInfo.lastName}</span>
            ) : (
              <span className="user-name">{userInfo.user.firstName} {userInfo.user.lastName}</span>
            )
          }
          <FaUserCircle size={20} />
        </div>
      }
    </header>
  );
};

export default Header;

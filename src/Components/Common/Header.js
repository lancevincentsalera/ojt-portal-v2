import React from "react";
import { FaGraduationCap, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="Header">
      <div className="header-title">
        <FaGraduationCap size={35} />
        &ensp;
        <span>OJT Management Portal</span>
      </div>
      <div className="header-user">
        <span className="user-name">John Doe</span>
        <FaUserCircle />
      </div>
    </header>
  );
};

export default Header;

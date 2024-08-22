import React from "react";
import { FaGraduationCap, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="Header">
      <div className="header-title">
        <FaGraduationCap size={30} />
        &ensp;
        <span>OJT Management Portal</span>
      </div>
      <div className="header-user">
        <span className="user-name">John Doe</span>
        <FaUserCircle size={20} />
      </div>
    </header>
  );
};

export default Header;

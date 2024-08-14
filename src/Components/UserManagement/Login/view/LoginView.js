import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const Login = () => {
  return (
    <div className="container">
      <div className="login">
        <div className="login-header">
          <FaGraduationCap size={40} />
          <span className="heading">OJT Management Portal</span>
        </div>
        <form className="login-content">
          <label>Email</label>
          <input
            name="Email"
            className="email"
            type="text"
            placeholder="Enter your email"
          />
          <label>Password</label>
          <input
            name="Password"
            className="password"
            type="password"
            placeholder="Enter your password"
          />
          <button type="submit" className="button-main">
            Login
          </button>
        </form>
        <div className="login-footer">
          <a href="/">Forgot Password?</a>
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;

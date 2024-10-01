import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import ForgotPasswordModalController from "../../Modals/ForgotPassword/controller/ForgotPasswordModalController";

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  handleLogin,
  showForgotPasswordModal,
  handleModalAction,
  isLoading
}) => {
  return (
    <>
      {showForgotPasswordModal && (
        <ForgotPasswordModalController
          showModal={showForgotPasswordModal}
          handleModalAction={handleModalAction}
        />
      )}
      <div className="container">
        <div className="login">
          <div className="login-header">
            <FaGraduationCap size={40} />
            <span className="heading">OJT Management Portal</span>
          </div>
          <form className="login-content" onSubmit={handleLogin}>
            <label>Email</label>
            <input
              name="Email"
              className="email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              name="Password"
              className="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="error">{error}</div>} 

            {
              isLoading ? (
                <button type="submit" className="button-main" disabled>
                  Loading...
                </button>
              ) : (
                <button type="submit" className="button-main">
                  Login
                </button>
              )
            }
            
          </form>
          <div className="login-footer">
            <p onClick={handleModalAction}>Forgot Password?</p>
            <a href="/register">Register</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

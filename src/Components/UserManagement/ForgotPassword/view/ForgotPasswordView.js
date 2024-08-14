import React from "react";

const ForgotPasswordView = () => {
  return (
    <div className="container">
      <div className="forgot">
        <p className="heading">Forgot Password</p>
        <p className="description">
          A reset code has been sent to your email. Please enter the code along
          with your new password.
        </p>
        <form className="forgot-content">
          <label htmlFor="ForgotPassword">Email</label>
          <input
            type="text"
            name="ResetCode"
            placeholder="Enter your reset code"
          />
          <label htmlFor="Password">New Password</label>
          <input
            type="password"
            name="Password"
            placeholder="Enter your new password"
          />
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            type="password"
            name="ConfirmPassword"
            placeholder="Confirm your new password"
          />
          <button type="submit" className="button-main">
            Reset Password
          </button>
        </form>
        <a href="/">Back to Login</a>
      </div>
    </div>
  );
};

export default ForgotPasswordView;

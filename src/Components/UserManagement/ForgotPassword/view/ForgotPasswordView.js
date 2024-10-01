import React from "react";
import { useGlobalState } from "../../../Globals/variables";

const ForgotPasswordView = ({ formData, handleChange, handleSubmit }) => {
  const { isLoading, error, success } = useGlobalState();

  return (
    <div className="container">
      <div className="forgot">
        <p className="heading">Forgot Password</p>
        <p className="description">
          A reset code has been sent to your email. Please enter the code along
          with your new password.
        </p>
        <form className="forgot-content" onSubmit={handleSubmit}>
        <label htmlFor="ResetCode">Reset Code</label>
        <input
          type="text"
          name="ResetCode"
          placeholder="Enter your reset code"
          value={formData.ResetCode}
          onChange={handleChange}
        />
        <label htmlFor="Password">New Password</label>
        <input
          type="password"
          name="Password"
          placeholder="Enter your new password"
          value={formData.Password}
          onChange={handleChange}
        />
        <label htmlFor="ConfirmPassword">Confirm Password</label>
        <input
          type="password"
          name="ConfirmPassword"
          placeholder="Confirm your new password"
          value={formData.ConfirmPassword}
          onChange={handleChange}
        />
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        {isLoading ? (
          <button type="submit" className="button-main" disabled>
            Loading...
          </button>
        ) : (
          <button type="submit" className="button-main">
            Reset Password
          </button>
        )}
      </form>
        <a href="/">Back to Login</a>
      </div>
    </div>
  );
};

export default ForgotPasswordView;

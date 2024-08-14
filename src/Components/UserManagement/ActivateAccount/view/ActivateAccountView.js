import React from "react";

const ActivateAccountView = () => {
  return (
    <div className="container">
      <div className="activate">
        <p className="heading">Account Activation</p>
        <p className="description">
          Your account has been created successfully! Please enter the
          activation code sent to your email to activate your account.
        </p>
        <form className="activate-content">
          <label htmlFor="ActivateAccount">Activation Code</label>
          <input
            type="text"
            name="ActivateAccount"
            placeholder="Enter your activation code"
          />
          <button type="submit" className="button-main">
            Activate Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActivateAccountView;

import React from "react";

const ForgotPasswordModalView = ({ showModal, handleModalAction }) => {
  return (
    <>
      <div className="modal-overlay" onClick={handleModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">Forgot Password</p>
            <span className="close" onClick={handleModalAction}>
              &times;
            </span>
          </div>
          <p className="modal-sub-heading">
            Enter your email address and we will send you a code to reset your
            password.
          </p>
          <form className="modal-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
            <div className="button-group">
              <button
                type="button"
                className="button-secondary"
                onClick={handleModalAction}
              >
                Cancel
              </button>
              <button type="submit" className="button-main">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordModalView;

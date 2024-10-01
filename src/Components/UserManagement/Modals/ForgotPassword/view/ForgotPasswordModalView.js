import React from "react";

const ForgotPasswordModalView = ({
  showModal,
  handleModalAction,
  handleSubmit,
  email,
  handleEmailChange,
  error,
  isLoading
}) => {
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
          <form className="modal-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {error && <p className="error">{error}</p>}
            <div className="button-group">
              <button
                type="button"
                className="button-secondary"
                onClick={handleModalAction}
              >
                Cancel
              </button>
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordModalView;

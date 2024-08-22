import React from "react";

const UsersModalView = ({ showModal, handleModalAction }) => {
  return (
    <>
      <div className="modal-overlay" onClick={handleModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">Create User</p>
            <span className="close" onClick={handleModalAction}>
              &times;
            </span>
          </div>
          <form className="modal-form">
            <div className="user-type">
              <label htmlFor="userType">User Type: &nbsp;</label>
              <select id="userType" name="userType">
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

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

export default UsersModalView;

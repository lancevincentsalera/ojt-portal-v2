import React from "react";

const CompaniesModalView = ({ showModal, handleModalAction }) => {
  return (
    <>
      <div className="modal-overlay" onClick={handleModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">Create Company</p>
            <span className="close" onClick={handleModalAction}>
              &times;
            </span>
          </div>
          <form className="modal-form no-subh">
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Company Name"
            />
            <input
              type="text"
              id="companyEmail"
              name="companyEmail"
              placeholder="Company Email"
            />
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
            />
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
            />
            <div className="button-group double">
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

export default CompaniesModalView;

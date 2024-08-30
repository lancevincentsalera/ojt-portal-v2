import React from "react";

const PendingFeedbackLogbooks = ({ showModal, handleModalAction }) => {
  return (
    <div className="logbook-entry-list">
      <div className="logbook-entry">
        <div className="logbook-entry-content">
          <p className="logbook-entry-title">Jun 09 Logbook</p>
          <p className="logbook-entry-date">Submitted on: Jun 09, 2024</p>
        </div>

        <button
          type="button"
          className="button-main create"
          onClick={handleModalAction}
        >
          View
        </button>
      </div>
      <div className="logbook-entry">
        <div className="logbook-entry-content">
          <p className="logbook-entry-title">Jun 10 Logbook</p>
          <p className="logbook-entry-date">Submitted on: Jun 12, 2024</p>
        </div>

        <button
          type="button"
          className="button-main create"
          onClick={handleModalAction}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default PendingFeedbackLogbooks;

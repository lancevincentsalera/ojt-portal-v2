import React from "react";

const FeedbackedLogbooks = ({ showModal, handleModalAction }) => {
  return (
    <div className="logbook-entry-list">
      <div className="logbook-entry">
        <div className="logbook-entry-content">
          <p className="logbook-entry-title">Jun 06 Logbook</p>
          <p className="logbook-entry-date">Submitted on: Jun 07, 2024</p>
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
          <p className="logbook-entry-title">Jun 07 Logbook</p>
          <p className="logbook-entry-date">Submitted on: Jun 07, 2024</p>
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
          <p className="logbook-entry-title">Jun 08 Logbook</p>
          <p className="logbook-entry-date">Submitted on: Jun 10, 2024</p>
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

export default FeedbackedLogbooks;

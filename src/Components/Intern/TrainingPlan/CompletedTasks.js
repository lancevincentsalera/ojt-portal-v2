import React from "react";

const CompletedTasks = ({ handleModalAction }) => {
  return (
    <div className="tp-tasklist">
      <div className="tp-task">
        <div className="detail-group1">
          <p className="bold">Task 1: Introduction to Company Policies</p>
          <p className="normal">Completed on: Jun 05, 2024</p>
          <p className="normal">
            Description: Familiarize yourself with the company policies and
            procedures.
          </p>
        </div>
        <button
          type="button"
          className="button-main create onClick={handleModalAction}"
          onClick={handleModalAction}
        >
          View
        </button>
      </div>
      <div className="tp-task">
        <div className="detail-group1">
          <p className="bold">Task 2: Safety Training</p>
          <p className="normal">Completed on: Jun 05, 2024</p>
          <p className="normal">
            Description: Attend the safety training session to understand
            workplace safety protocols.
          </p>
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

export default CompletedTasks;

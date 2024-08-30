import React from "react";

const GradedTasks = ({ handleModalAction }) => {
  return (
    <div className="tp-tasklist">
      <div className="tp-task">
        <div className="detail-group1">
          <p className="bold">Task 3: Project Management Basics</p>
          <p className="normal">
            Description: Learn the basics of project management, including
            planning, execution, and monitoring.
          </p>

          <p className="normal">Score: 4.7</p>
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

export default GradedTasks;

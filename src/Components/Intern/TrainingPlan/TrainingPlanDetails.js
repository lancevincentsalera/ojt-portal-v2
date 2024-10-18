import React from "react";

const TrainingPlanDetails = ({ trainingPlan }) => {
  return (
    <div className="tp-details">
      <p className="tp-heading">Training Plan Details</p>
      <div className="tp-deet">
        <p className="bold">{trainingPlan.title}</p>
        <p className="normal">{trainingPlan.description}</p>
      </div>
      <div className="tp-more">
        <div className="tp-deet">
          <p className="bold">Start Date</p>
          <p className="normal">{trainingPlan.expectedStartDate}</p>
        </div>
        <div className="tp-deet">
          <p className="bold">End Date</p>
          <p className="normal">{trainingPlan.expectedEndDate}</p>
        </div>
        <div className="tp-deet">
          <p className="bold">Duration</p>
          <p className="normal">{trainingPlan.durationInHours} Hours</p>
        </div>
        <div className="tp-deet">
          <p className="bold">Number of Tasks</p>
          <p className="normal">{trainingPlan.tasks.length} Tasks</p>
        </div>
      </div>
    </div>
  );
};

export default TrainingPlanDetails;

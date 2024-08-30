import React from "react";

const TrainingPlanDetails = () => {
  return (
    <div className="tp-details">
      <p className="tp-heading">Training Plan Details</p>
      <div className="tp-deet">
        <p className="bold">Comprehensive Onboarding Program</p>
        <p className="normal">
          A detailed program designed to familiarize new employees with the
          company, its policies, and their roles.
        </p>
      </div>
      <div className="tp-more">
        <div className="tp-deet">
          <p className="bold">Start Date</p>
          <p className="normal">Jun 01, 2024</p>
        </div>
        <div className="tp-deet">
          <p className="bold">End Date</p>
          <p className="normal">Aug 01, 2024</p>
        </div>
        <div className="tp-deet">
          <p className="bold">Duration</p>
          <p className="normal">2 Months</p>
        </div>
        <div className="tp-deet">
          <p className="bold">Assigned Supervisor</p>
          <p className="normal">Jane Smith</p>
        </div>
        <div className="tp-deet">
          <p className="bold">Department</p>
          <p className="normal">Human Resources</p>
        </div>
        <div className="tp-deet">
          <p className="bold">Number of Tasks</p>
          <p className="normal">15 Tasks</p>
        </div>
      </div>
    </div>
  );
};

export default TrainingPlanDetails;

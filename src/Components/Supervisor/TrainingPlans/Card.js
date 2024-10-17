import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ trainingPlan }) => {
  const navigate = useNavigate();
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-title">{trainingPlan.Title}</p>
      </div>
      <div className="card-body">
        <p className="card-desc">{trainingPlan.Description}</p>
        <p className="card-date">Start Date: {trainingPlan.StartDate}</p>
        <p className="card-date">End Date: {trainingPlan.EndDate}</p>
        <p className="card-supervisor">Company: {trainingPlan.Supervisor}</p>
      </div>
      <div className="card-footer">
        <button
          type="button"
          className="button-main create"
          onClick={() => navigate("/task-list")}
        >
          View Tasks
        </button>
      </div>
    </div>
  );
};

export default Card;

import React from "react";

const Card = ({ trainingPlan }) => {
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-title">{trainingPlan.Title}</p>
      </div>
      <div className="card-body">
        <p className="card-desc">{trainingPlan.Description}</p>
        <p className="card-date">Start Date: {trainingPlan.StartDate}</p>
        <p className="card-date">End Date: {trainingPlan.EndDate}</p>
        <p className="card-supervisor">Supervisor: {trainingPlan.Supervisor}</p>
      </div>
      <div className="card-footer">
        <button className="button-main create">View Tasks</button>
      </div>
    </div>
  );
};

export default Card;

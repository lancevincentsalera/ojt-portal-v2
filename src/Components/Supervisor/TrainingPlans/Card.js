import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ trainingPlan, getTrainingPlanDetails }) => {
  const navigate = useNavigate();
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-title">{trainingPlan.title}</p>
      </div>
      <div className="card-body">
        <p className="card-desc">{trainingPlan.description}</p>
        <p className="card-date">
          <span style={{ fontSize: "100%", fontWeight: "bold" }}>
            Total Tasks
          </span>
          : {trainingPlan.totalTasks}
        </p>
        <p className="card-date" style={{ fontWeight: "bold" }}>
          System Generated:{" "}
          <span
            style={{
              color: trainingPlan.isSystemGenerated ? "#4caf50" : "#ff6b6b",
              fontSize: "100%",
            }}
          >
            {trainingPlan.isSystemGenerated ? "Yes" : "No"}
          </span>
        </p>
        <p className="card-supervisor"></p>
      </div>
      <div className="card-footer">
        <button
          type="button"
          className="button-main create"
          onClick={async () => {
            const details = await getTrainingPlanDetails(trainingPlan.id);
            navigate("/task-list", {
              state: { trainingPlanDetails: details },
            });
          }}
        >
          View Tasks
        </button>
      </div>
    </div>
  );
};

export default Card;

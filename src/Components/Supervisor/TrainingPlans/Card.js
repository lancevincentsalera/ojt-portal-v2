import React from "react";
import { useNavigate } from "react-router-dom";
import { encryptId } from "../../../Functions/common";

const Card = ({
  trainingPlan,
  handleSetMode,
  handleSetSelectedTrainingPlan,
  handleModalAction,
}) => {
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
        {/* <p className="card-date" style={{ fontWeight: "bold" }}>
          System Generated:{" "}
          <span
            style={{
              color: trainingPlan.isSystemGenerated ? "#4caf50" : "#ff6b6b",
              fontSize: "100%",
            }}
          >
            {trainingPlan.isSystemGenerated ? "Yes" : "No"}
          </span>
        </p> */}
        <p className="card-supervisor"></p>
      </div>
      <div className="card-footer button-group double">
        <button
          type="button"
          className="button-main create"
          onClick={() => {
            const encryptedId = encryptId(trainingPlan.id);
            navigate(`/task-list?id=${encodeURIComponent(encryptedId)}`);
          }}
        >
          View Tasks
        </button>
        <button
          type="button"
          className="button-secondary create"
          onClick={() => {
            handleSetMode(trainingPlan.isSystemGenerated ? "copy" : "edit");
            handleSetSelectedTrainingPlan(trainingPlan);
            handleModalAction();
          }}
        >
          {trainingPlan.isSystemGenerated ? "Make a Copy" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default Card;

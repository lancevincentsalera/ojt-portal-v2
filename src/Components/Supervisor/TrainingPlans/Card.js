import React from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const Card = ({ trainingPlan }) => {
  const navigate = useNavigate();
  const encryptId = (id) => {
    return CryptoJS.AES.encrypt(id.toString(), "trainingPlanID").toString();
  };
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
      <div className="card-footer">
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
      </div>
    </div>
  );
};

export default Card;

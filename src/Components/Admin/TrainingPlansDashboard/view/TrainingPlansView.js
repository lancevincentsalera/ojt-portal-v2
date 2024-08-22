import React from "react";
import SearchBar from "../../../Common/SearchBar";
import Card from "../Card";

const TrainingPlansView = ({ TrainingPlans }) => {
  return (
    <div className="main-dashboard">
      <div className="main-header">
        <p className="main-heading">Training Plans</p>
        <SearchBar />
      </div>
      <div className="cards-content">
        {TrainingPlans.map((trainingPlan, i) => (
          <Card key={i} trainingPlan={trainingPlan} />
        ))}
      </div>
    </div>
  );
};

export default TrainingPlansView;

import React from "react";
import Card from "./Card";

const MyTrainingPlans = ({ TrainingPlans }) => {
  return (
    <div className="cards-content">
      {TrainingPlans.map((trainingPlan, i) => (
        <Card key={i} trainingPlan={trainingPlan} />
      ))}
    </div>
  );
};

export default MyTrainingPlans;

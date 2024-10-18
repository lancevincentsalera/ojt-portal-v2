import React from "react";
import Card from "./Card";

const MyTrainingPlans = ({ TrainingPlans, getTrainingPlanDetails }) => {
  return (
    <div className="cards-content">
      {TrainingPlans.map((trainingPlan, i) => (
        <Card
          key={i}
          trainingPlan={trainingPlan}
          getTrainingPlanDetails={getTrainingPlanDetails}
        />
      ))}
    </div>
  );
};

export default MyTrainingPlans;

import React from "react";
import Card from "./Card";

const MyTrainingPlans = ({
  TrainingPlans,
  handleSetMode,
  handleSetSelectedTrainingPlan,
  handleModalAction
}) => {
  return (
    <div className="cards-content">
      {TrainingPlans.map((trainingPlan, i) => (
        <Card
          key={i}
          trainingPlan={trainingPlan}
          handleSetMode={handleSetMode}
          handleSetSelectedTrainingPlan={handleSetSelectedTrainingPlan}
          handleModalAction={handleModalAction}
        />
      ))}
    </div>
  );
};

export default MyTrainingPlans;

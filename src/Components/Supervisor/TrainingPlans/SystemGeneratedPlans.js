import React from "react";
import Card from "./Card";

const SystemGeneratedPlans = ({
  systemGeneratedPlans,
  handleSetMode,
  handleSetSelectedTrainingPlan,
  handleModalAction,
}) => {
  return (
    <div className="cards-content">
      {systemGeneratedPlans.map((trainingPlan) => (
        <Card
          key={trainingPlan.id}
          trainingPlan={trainingPlan}
          handleSetMode={handleSetMode}
          handleSetSelectedTrainingPlan={handleSetSelectedTrainingPlan}
          handleModalAction={handleModalAction}
        />
      ))}
    </div>
  );
};

export default SystemGeneratedPlans;

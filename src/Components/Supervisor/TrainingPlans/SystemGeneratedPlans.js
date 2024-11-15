import React from "react";
import Card from "./Card";

const SystemGeneratedPlans = ({ systemGeneratedPlans }) => {
  return (
    <div className="cards-content">
      {console.log(systemGeneratedPlans)}
      {systemGeneratedPlans.map((trainingPlan) => (
        <Card key={trainingPlan.id} trainingPlan={trainingPlan} />
      ))}
    </div>
  );
};

export default SystemGeneratedPlans;

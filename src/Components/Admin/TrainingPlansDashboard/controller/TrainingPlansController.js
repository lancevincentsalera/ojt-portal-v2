import React from "react";
import TrainingPlansView from "../view/TrainingPlansView";
import { TrainingPlans } from "../model/TrainingPlansModel";

const TrainingPlansController = () => {
  return <TrainingPlansView TrainingPlans={TrainingPlans} />;
};

export default TrainingPlansController;

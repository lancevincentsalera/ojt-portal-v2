import React, { useState } from "react";
import TrainingPlansView from "../view/TrainingPlansView";
import { TrainingPlans } from "../model/TrainingPlansModel";

const TrainingPlansController = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModalAction = () => setShowModal(!showModal);
  return (
    <TrainingPlansView
      TrainingPlans={TrainingPlans}
      showModal={showModal}
      handleModalAction={handleModalAction}
    />
  );
};

export default TrainingPlansController;

import React from "react";
import CreateTrainingPlanModalView from "../view/CreateTrainingPlanModalView";

const CreateTrainingPlanModalController = ({
  showModal,
  handleModalAction,
}) => {
  return (
    <CreateTrainingPlanModalView
      showModal={showModal}
      handleModalAction={handleModalAction}
    />
  );
};

export default CreateTrainingPlanModalController;

import React from "react";
import TrainingPlansModalView from "../view/TrainingPlansModalView";

const TrainingPlansModalController = ({ showModal, handleModalAction }) => {
  return (
    <TrainingPlansModalView
      showModal={showModal}
      handleModalAction={handleModalAction}
    />
  );
};

export default TrainingPlansModalController;

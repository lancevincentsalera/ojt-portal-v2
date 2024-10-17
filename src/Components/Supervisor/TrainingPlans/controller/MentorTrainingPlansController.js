import React, { useState } from "react";
import MentorTrainingPlansView from "../view/MentorTrainingPlansView";
import { MentorTrainingPlans } from "../model/MentorTrainingPlansModel";

const MentorTrainingPlansController = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleCreateModalAction = () => setShowCreateModal(!showCreateModal);
  return (
    <MentorTrainingPlansView
      TrainingPlans={MentorTrainingPlans}
      showCreateModal={showCreateModal}
      handleCreateModalAction={handleCreateModalAction}
    />
  );
};

export default MentorTrainingPlansController;

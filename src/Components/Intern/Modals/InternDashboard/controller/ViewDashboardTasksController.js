import React from "react";
import ViewDashboardTasksView from "../view/ViewDashboardTasksView";

const ViewDashboardTasksController = ({ showModal, handleModalAction, selectedTask , fetchTrainingPlan}) => {
  return (
    <ViewDashboardTasksView
      showModal={showModal}
      handleModalAction={handleModalAction}
      selectedTask={selectedTask}
      fetchTrainingPlan={fetchTrainingPlan}
    />
  );
};

export default ViewDashboardTasksController;

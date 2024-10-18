import React from "react";
import ViewDashboardTasksView from "../view/ViewDashboardTasksView";

const ViewDashboardTasksController = ({ showModal, handleModalAction, selectedTask }) => {
  return (
    <ViewDashboardTasksView
      showModal={showModal}
      handleModalAction={handleModalAction}
      selectedTask={selectedTask}
    />
  );
};

export default ViewDashboardTasksController;

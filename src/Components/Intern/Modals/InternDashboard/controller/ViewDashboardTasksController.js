import React from "react";
import ViewDashboardTasksView from "../view/ViewDashboardTasksView";

const ViewDashboardTasksController = ({ showModal, handleModalAction }) => {
  return (
    <ViewDashboardTasksView
      showModal={showModal}
      handleModalAction={handleModalAction}
    />
  );
};

export default ViewDashboardTasksController;

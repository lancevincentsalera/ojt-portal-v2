import React from "react";
import AssignPlanModalView from "../view/AssignPlanModalView";

const AssignPlanModalController = ({ handleAssignModalAction }) => {
  return (
    <AssignPlanModalView handleAssignModalAction={handleAssignModalAction} />
  );
};

export default AssignPlanModalController;

import React from "react";
import AddTaskModalView from "../view/AddTaskModalView";

const AddTaskModalController = ({ handleAddTaskModalAction }) => {
  return (
    <AddTaskModalView handleAddTaskModalAction={handleAddTaskModalAction} />
  );
};

export default AddTaskModalController;

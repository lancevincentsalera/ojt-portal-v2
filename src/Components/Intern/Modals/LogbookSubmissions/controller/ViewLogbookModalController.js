import React from "react";
import ViewLogbookModalView from "../view/ViewLogbookModalView";

const ViewLogbookModalController = ({ showModal, handleModalAction }) => {
  return (
    <ViewLogbookModalView
      showModal={showModal}
      handleModalAction={handleModalAction}
    />
  );
};

export default ViewLogbookModalController;

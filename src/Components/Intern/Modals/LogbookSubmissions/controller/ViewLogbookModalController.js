import React from "react";
import ViewLogbookModalView from "../view/ViewLogbookModalView";

const ViewLogbookModalController = ({ showModal, handleModalAction, selectedLogbook }) => {
  return (
    <ViewLogbookModalView
      showModal={showModal}
      handleModalAction={handleModalAction}
      selectedLogbook={selectedLogbook}
    />
  );
};

export default ViewLogbookModalController;

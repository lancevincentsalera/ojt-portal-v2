import React from "react";
import LogbookSubmissionsModalView from "../view/LogbookSubmissionsModalView";

const LogbookSubmissionsModalController = ({
  showModal,
  handleModalAction,
  logbook,
}) => {
  return (
    <LogbookSubmissionsModalView
      showModal={showModal}
      handleModalAction={handleModalAction}
      logbook={logbook}
    />
  );
};

export default LogbookSubmissionsModalController;

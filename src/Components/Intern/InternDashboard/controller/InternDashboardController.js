import React, { useState } from "react";
import InternDashboardView from "../view/InternDashboardView";

const InternDashboardController = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModalAction = () => setShowModal(!showModal);
  return (
    <InternDashboardView
      showModal={showModal}
      handleModalAction={handleModalAction}
    />
  );
};

export default InternDashboardController;

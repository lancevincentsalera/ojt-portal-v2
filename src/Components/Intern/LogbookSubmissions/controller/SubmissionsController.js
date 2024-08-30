import React, { useState } from "react";
import SubmissionsView from "../view/SubmissionsView";

const SubmissionsController = () => {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState({
    pending: true,
    feedbacked: false,
  });

  const handleTabChange = (p, f) => {
    setTab({ pending: p, feedbacked: f });
  };

  const handleModalAction = () => setShowModal(!showModal);
  return (
    <SubmissionsView
      showModal={showModal}
      handleModalAction={handleModalAction}
      tab={tab}
      handleTabChange={handleTabChange}
    />
  );
};

export default SubmissionsController;

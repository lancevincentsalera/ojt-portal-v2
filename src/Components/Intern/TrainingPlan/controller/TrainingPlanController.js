import React, { useState } from "react";
import TrainingPlanView from "../view/TrainingPlanView";

const TrainingPlanController = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("tp");
  const [tab, setTab] = useState({
    tp: true,
    graded: false,
    completed: false,
    ongoing: false,
    pastDue: false,
  });

  const handleTabChange = (selectedTab) => {
    setTab((prevState) => {
      const updatedTab = { ...prevState };
      Object.keys(updatedTab).forEach((key) => {
        updatedTab[key] = key === selectedTab;
      });
      return updatedTab;
    });
    setCurrentTab(selectedTab);
  };

  const handleModalAction = () => setShowModal(!showModal);
  return (
    <TrainingPlanView
      showModal={showModal}
      handleModalAction={handleModalAction}
      tab={tab}
      currentTab={currentTab}
      handleTabChange={handleTabChange}
    />
  );
};

export default TrainingPlanController;

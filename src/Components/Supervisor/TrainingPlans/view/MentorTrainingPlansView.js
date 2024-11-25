import React, { useCallback, useState } from "react";
import CreateTrainingPlanModalController from "../../Modals/TrainingPlans/controller/CreateTrainingPlanModalController";
import { FaPlus } from "react-icons/fa6";
import MyTrainingPlans from "../MyTrainingPlans";
import SystemGeneratedPlans from "../SystemGeneratedPlans";

const MentorTrainingPlansView = ({
  TrainingPlans,
  showCreateModal,
  handleCreateModalAction,
  tab,
  handleTabChange,
  systemGeneratedPlans,
}) => {
  const [mode, setMode] = useState("create");
  const handleSetMode = useCallback((mode) => {
    setMode(mode);
  }, []);
  const [selectedTrainingPlan, setSelectedTrainingPlan] = useState(null);
  const handleSetSelectedTrainingPlan = useCallback((trainingPlan) => {
    setSelectedTrainingPlan(trainingPlan);
  }, []);
  return (
    <>
      {showCreateModal && (
        <CreateTrainingPlanModalController
          mode={mode}
          selectedTrainingPlan={selectedTrainingPlan}
          showModal={showCreateModal}
          handleModalAction={handleCreateModalAction}
        />
      )}
      <div className="main-dashboard">
        <div className="main-header">
          <p className="main-heading">Training Plans</p>
          <button
            className="button-main create"
            onClick={() => {
              handleCreateModalAction();
              handleSetMode("create");
            }}
          >
            <FaPlus size={20} />
            &nbsp; Create New Plan
          </button>
        </div>
        <div className="tabs" style={{ justifyContent: "normal" }}>
          <div
            className={tab.myPlans ? "tab active" : "tab"}
            onClick={() => {
              handleTabChange(true);
            }}
            style={{ width: "15%" }}
          >
            My Plans
          </div>
          <div
            className={tab.systemGenerated ? "tab active" : "tab"}
            onClick={() => {
              handleTabChange(false);
            }}
            style={{ width: "15%" }}
          >
            System Generated
          </div>
        </div>
        {tab.myPlans && (
          <MyTrainingPlans
            TrainingPlans={TrainingPlans}
            handleSetMode={handleSetMode}
            handleSetSelectedTrainingPlan={handleSetSelectedTrainingPlan}
            handleModalAction={handleCreateModalAction}
          />
        )}
        {tab.systemGenerated && (
          <SystemGeneratedPlans
            systemGeneratedPlans={systemGeneratedPlans}
            handleSetMode={handleSetMode}
            handleSetSelectedTrainingPlan={handleSetSelectedTrainingPlan}
            handleModalAction={handleCreateModalAction}
          />
        )}
      </div>
    </>
  );
};

export default MentorTrainingPlansView;

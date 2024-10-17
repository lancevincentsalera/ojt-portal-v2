import React from "react";
import CreateTrainingPlanModalController from "../../Modals/TrainingPlans/controller/CreateTrainingPlanModalController";
import Card from "../Card";
import { FaPlus } from "react-icons/fa6";

const MentorTrainingPlansView = ({
  TrainingPlans,
  showCreateModal,
  handleCreateModalAction,
}) => {
  return (
    <>
      {showCreateModal && (
        <CreateTrainingPlanModalController
          showModal={showCreateModal}
          handleModalAction={handleCreateModalAction}
        />
      )}
      <div className="main-dashboard">
        <div className="main-header">
          <p className="main-heading">Training Plans</p>
          <button
            className="button-main create"
            onClick={handleCreateModalAction}
          >
            <FaPlus size={20} />
            &nbsp; Create New Plan
          </button>
        </div>
        <div className="cards-content">
          {TrainingPlans.map((trainingPlan, i) => (
            <Card key={i} trainingPlan={trainingPlan} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MentorTrainingPlansView;

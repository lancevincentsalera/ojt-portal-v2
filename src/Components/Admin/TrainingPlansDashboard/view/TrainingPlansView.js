import React from "react";
import SearchBar from "../../../Common/SearchBar";

import TrainingPlansModalController from "../../Modals/TrainingPlans/controller/TrainingPlansModalController";
import Card from "../Card";

const TrainingPlansView = ({
  TrainingPlans,
  showModal,
  handleModalAction,
  getTrainingPlanDetails,
}) => {
  return (
    <>
      {showModal && (
        <TrainingPlansModalController
          showModal={showModal}
          handleModalAction={handleModalAction}
        />
      )}
      <div className="main-dashboard">
        <div className="main-header">
          <p className="main-heading">Training Plans</p>
          {/* <SearchBar /> */}
        </div>
        <div className="cards-content">
          {TrainingPlans.map((trainingPlan, i) => (
            <Card
              key={i}
              trainingPlan={trainingPlan}
              getTrainingPlanDetails={getTrainingPlanDetails}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TrainingPlansView;

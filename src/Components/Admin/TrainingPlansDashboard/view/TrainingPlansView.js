import React from "react";
import SearchBar from "../../../Common/SearchBar";
import Card from "../Card";
import TrainingPlansModalController from "../../Modals/TrainingPlans/controller/TrainingPlansModalController";

const TrainingPlansView = ({ TrainingPlans, showModal, handleModalAction }) => {
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
          <SearchBar />
        </div>
        <div className="cards-content">
          {TrainingPlans.map((trainingPlan, i) => (
            <Card
              key={i}
              trainingPlan={trainingPlan}
              handleModalAction={handleModalAction}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TrainingPlansView;

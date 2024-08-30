import React from "react";
import ViewDashboardTasksController from "../../Modals/InternDashboard/controller/ViewDashboardTasksController";
import PastDueTasks from "../PastDueTasks";
import TrainingPlanDetails from "../TrainingPlanDetails";
import GradedTasks from "../GradedTasks";
import CompletedTasks from "../CompletedTasks";
import OngoingTasks from "../OngoingTasks";

const TrainingPlanView = ({
  showModal,
  handleModalAction,
  tab,
  currentTab,
  handleTabChange,
}) => {
  return (
    <>
      {showModal && (
        <ViewDashboardTasksController
          showModal={showModal}
          handleModalAction={handleModalAction}
        />
      )}
      <div className="main-dashboard">
        <div className="main-header">
          <p className="main-heading">Assigned Training Plan</p>
        </div>
        <div className="main-content">
          <p className="sub-heading">
            Welcome to your training plan. Here you can view the tasks
            categorized into Completed, Ongoing, and Past Due. Make sure to keep
            track of your progress and complete all tasks on time.
          </p>
          <div className="tabs">
            <div
              className={tab.tp ? "tab active" : "tab"}
              onClick={() => {
                handleTabChange("tp");
              }}
            >
              Training Plan Details
            </div>
            <div
              className={tab.graded ? "tab active" : "tab"}
              onClick={() => {
                handleTabChange("graded");
              }}
            >
              Graded Tasks
            </div>
            <div
              className={tab.completed ? "tab active" : "tab"}
              onClick={() => {
                handleTabChange("completed");
              }}
            >
              Completed Tasks
            </div>
            <div
              className={tab.ongoing ? "tab active" : "tab"}
              onClick={() => {
                handleTabChange("ongoing");
              }}
            >
              Ongoing Tasks
            </div>
            <div
              className={tab.pastDue ? "tab active" : "tab"}
              onClick={() => {
                handleTabChange("pastDue");
              }}
            >
              Past Due Tasks
            </div>
          </div>
          {tab.tp && (
            <TrainingPlanDetails handleModalAction={handleModalAction} />
          )}
          {tab.graded && <GradedTasks handleModalAction={handleModalAction} />}
          {tab.completed && (
            <CompletedTasks handleModalAction={handleModalAction} />
          )}
          {tab.ongoing && (
            <OngoingTasks handleModalAction={handleModalAction} />
          )}
          {tab.pastDue && (
            <PastDueTasks handleModalAction={handleModalAction} />
          )}
        </div>
      </div>
    </>
  );
};

export default TrainingPlanView;

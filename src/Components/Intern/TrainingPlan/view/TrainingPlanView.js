import React, { useState } from "react";
import ViewDashboardTasksController from "../../Modals/InternDashboard/controller/ViewDashboardTasksController";
import TrainingPlanDetails from "../TrainingPlanDetails";
import GradedTasks from "../GradedTasks";
import CompletedTasks from "../CompletedTasks";
import OngoingTasks from "../OngoingTasks";
import { Empty } from "antd";
import NotStartedTasks from "../NotStarted";
import DoneLateTasks from "../DoneLate";

const TrainingPlanView = ({
  tab,
  currentTab,
  handleTabChange,
  trainingPlans,
  fetchTrainingPlan
}) => {

  const [showDetails, setShowDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const toggleDetails = () => setShowDetails(!showDetails);
  const [showModal, setShowModal] = useState(false);

  const handleModalAction = (task) => {
    setSelectedTask(task);
    setShowModal(!showModal);
  };

  const hasTrainingPlans = trainingPlans && trainingPlans?.tasks;



  const gradedTasks = trainingPlans?.tasks.filter(task => task.score > 0);


  return (
    <>
      {showModal && (
        <ViewDashboardTasksController
          showModal={showModal}
          handleModalAction={handleModalAction}
          selectedTask={selectedTask}
          fetchTrainingPlan={fetchTrainingPlan}
        />
      )}
      {hasTrainingPlans ? (
        <div className="main-dashboard">
          <div className="main-header">
            <p className="main-heading">{trainingPlans.title}</p>
          </div>
          <div className="main-content">
            <p className="sub-heading">{trainingPlans.description}</p>
            <div className="tabs" style={{ justifyContent: "normal" }}>
              {["tp", "graded", "completed", "inProgress", "notStarted", "doneLate"].map((tabName, idx) => (
                <div
                  key={idx}
                  className={tab[tabName] ? "tab active" : "tab"}
                  onClick={() => handleTabChange(tabName)}
                  style={{ width: "15%" }}
                >
                  {tabName === "tp"
                  ? "Training Plan Details"
                  : tabName === "notStarted"
                  ? "Not Started"
                  : tabName === "doneLate"
                  ? "Done Late"
                  : tabName === "inProgress"
                  ? "In Progress"
                  : tabName.charAt(0).toUpperCase() + tabName.slice(1) + " Tasks"}
                </div>
              ))}
            </div>

            <div className="training-plan-card">
              {showDetails && (
                <div className="card-body">
                  <p>Duration: {trainingPlans.durationInHours} hours</p>
                  <p>
                    Start Date: {trainingPlans.expectedStartDate} | End Date:{" "}
                    {trainingPlans.expectedEndDate}
                  </p>
                  <div className="tasks-list">
                    {trainingPlans?.tasks.map((task) => (
                      <div key={task.id} className="task-item">
                        <p>
                          <strong>{task.trainingTask.title}</strong>
                        </p>
                        <p>Status: {task.taskStatus}</p>
                        <p>Due: {task.dueDate ? task.dueDate : "N/A"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {tab.tp && <TrainingPlanDetails trainingPlan={trainingPlans} />}
            {tab.graded && (
              <GradedTasks
                tasks={gradedTasks}
                handleModalAction={handleModalAction}
              />
            )}
            {tab.completed && (
              <CompletedTasks
                tasks={trainingPlans?.tasks.filter((task) => task.taskStatus === "Done" && task.score === 0)}
                handleModalAction={handleModalAction}
              />
            )}
            {tab.inProgress && (
              <OngoingTasks
                tasks={trainingPlans?.tasks.filter((task) => task.taskStatus === "InProgress")}
                handleModalAction={handleModalAction}
              />
            )}
            {tab.notStarted && (
              <NotStartedTasks
                tasks={trainingPlans?.tasks.filter((task) => task.taskStatus === "NotStarted")}
                handleModalAction={handleModalAction}
              />
            )}
            {tab.doneLate && (
              <DoneLateTasks
                tasks={trainingPlans?.tasks.filter((task) => task.taskStatus === "DoneLate")}
                handleModalAction={handleModalAction}
              />
            )}
          </div>
        </div>
      ) : (
        <Empty description="No data available" />
      )}
    </>
  );
};

export default TrainingPlanView;

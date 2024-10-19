import React, { useState } from "react";
import ViewDashboardTasksController from "../../Modals/InternDashboard/controller/ViewDashboardTasksController";
import PastDueTasks from "../PastDueTasks";
import TrainingPlanDetails from "../TrainingPlanDetails";
import GradedTasks from "../GradedTasks";
import CompletedTasks from "../CompletedTasks";
import OngoingTasks from "../OngoingTasks";
import { Empty } from "antd";

const TrainingPlanView = ({
  tab,
  currentTab,
  handleTabChange,
  trainingPlans,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const toggleDetails = () => setShowDetails(!showDetails);
  const [showModal, setShowModal] = useState(false);

  const handleModalAction = (task) => {
    setSelectedTask(task);
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && (
        <ViewDashboardTasksController
          showModal={showModal}
          handleModalAction={handleModalAction}
          selectedTask={selectedTask}
        />
      )}
      {trainingPlans ? (
        <div className="main-dashboard">
          <div className="main-header">
            <p className="main-heading">{trainingPlans.title}</p>
          </div>
          <div className="main-content">
            <p className="sub-heading">{trainingPlans.description}</p>
            <div className="tabs" style={{ justifyContent: "normal" }}>
              {["tp", "graded", "completed", "ongoing", "pastDue"].map((tabName, idx) => (
                <div
                  key={idx}
                  className={tab[tabName] ? "tab active" : "tab"}
                  onClick={() => handleTabChange(tabName)}
                  style={{ width: "15%" }}
                >
                  {tabName === "tp"
                    ? "Training Plan Details"
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
                    {trainingPlans.tasks.map((task) => (
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
              <GradedTasks tasks={trainingPlans.tasks.filter(task => task.taskStatus === "Graded")} handleModalAction={handleModalAction}/>
            )}
            {tab.completed && (
              <CompletedTasks tasks={trainingPlans.tasks.filter(task => task.taskStatus === "Completed")} handleModalAction={handleModalAction}/>
            )}
            {tab.ongoing && (
              <OngoingTasks tasks={trainingPlans.tasks.filter(task => task.taskStatus === "Ongoing")} handleModalAction={handleModalAction}/>
            )}
            {tab.pastDue && (
              <PastDueTasks tasks={trainingPlans.tasks.filter(task => new Date(task.dueDate) < new Date())} handleModalAction={handleModalAction}/>
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

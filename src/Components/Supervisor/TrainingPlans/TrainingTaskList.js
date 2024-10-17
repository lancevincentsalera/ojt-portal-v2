import React, { useState } from "react";
import AssignPlanModalController from "../Modals/TrainingPlans/controller/AssignPlanModalController";
import AddTaskModalController from "../Modals/TrainingPlans/controller/AddTaskModalController";

const TrainingTaskList = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const handleAssignModalAction = () => setShowAssignModal(!showAssignModal);

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const handleAddTaskModalAction = () => {
    console.log(showAddTaskModal);
    setShowAddTaskModal(!showAddTaskModal);
  };
  return (
    <>
      {showAssignModal && (
        <AssignPlanModalController
          handleAssignModalAction={handleAssignModalAction}
        />
      )}
      {showAddTaskModal && (
        <AddTaskModalController
          handleAddTaskModalAction={handleAddTaskModalAction}
        />
      )}
      <div className="main-dashboard">
        <div className="tp-tasklist">
          <div className="tp-details">
            <p className="tp-heading">Training Plan Details</p>

            <div className="tp-deet">
              <p className="bold">Comprehensive Onboarding Program</p>
              <p className="normal">
                A detailed program designed to familiarize new employees with
                the company, its policies, and their roles.
              </p>
            </div>
            <div className="tp-more">
              <div className="tp-deet">
                <p className="bold">Start Date</p>
                <p className="normal">Jun 01, 2024</p>
              </div>
              <div className="tp-deet">
                <p className="bold">End Date</p>
                <p className="normal">Aug 01, 2024</p>
              </div>
              <div className="tp-deet">
                <p className="bold">Duration</p>
                <p className="normal">2 Months</p>
              </div>
              <div className="tp-deet">
                <p className="bold">Assigned Supervisor</p>
                <p className="normal">Jane Smith</p>
              </div>
              <div className="tp-deet">
                <p className="bold">Department</p>
                <p className="normal">Human Resources</p>
              </div>
              <div className="tp-deet">
                <p className="bold">Number of Tasks</p>
                <p className="normal">15 Tasks</p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
              }}
            >
              <button
                type="button"
                className="button-main"
                onClick={handleAssignModalAction}
              >
                Assign Plan to Trainee(s)
              </button>
              <button
                type="button"
                className="button-secondary"
                onClick={handleAddTaskModalAction}
              >
                Add Task
              </button>
            </div>
          </div>
          <span
            style={{
              fontSize: "80%",
              fontWeight: "bold",
              margin: "0.5rem 0 0 0",
            }}
          >
            Tasks
          </span>
          <div className="tp-task">
            <div className="detail-group1">
              <p className="bold">Task 3: Project Management Basics</p>
              <p className="normal">Completed on: Jun 05, 2024</p>
              <p className="normal">
                Description: Learn the basics of project management, including
                planning, execution, and monitoring.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainingTaskList;

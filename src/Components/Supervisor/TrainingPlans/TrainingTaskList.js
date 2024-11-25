import React, { useEffect, useState } from "react";
import AssignPlanModalController from "../Modals/TrainingPlans/controller/AssignPlanModalController";
import AddTaskModalController from "../Modals/TrainingPlans/controller/AddTaskModalController";
import { getTrainingPlanDetails } from "./model/MentorTrainingPlanModel";
import { useLocation } from "react-router-dom";
import { decryptId } from "../../../Functions/common";

const TrainingTaskList = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const handleAssignModalAction = () => setShowAssignModal(!showAssignModal);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [trainingPlanDetails, setTrainingPlanDetails] = useState({ tasks: [] });
  const location = useLocation();
  const [mode, setMode] = useState("add");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const encryptedId = decodeURIComponent(urlParams.get("id"));

    if (encryptedId) {
      const decryptedId = decryptId(encryptedId);

      const fetchTrainingPlanDetails = async () => {
        try {
          const response = await getTrainingPlanDetails(decryptedId);
          setTrainingPlanDetails(response);
        } catch (error) {
          console.error(error);
        }
      };

      fetchTrainingPlanDetails();
    }
  }, [location.search]);

  const handleAddTaskModalAction = () => {
    setShowAddTaskModal(!showAddTaskModal);
  };
  return (
    <>
      {showAssignModal && (
        <AssignPlanModalController
          handleAssignModalAction={handleAssignModalAction}
          trainingPlanDetails={trainingPlanDetails}
        />
      )}
      {showAddTaskModal && (
        <AddTaskModalController
          mode={mode}
          taskToEdit={mode === "edit" ? selectedTask : null}
          handleAddTaskModalAction={handleAddTaskModalAction}
          trainingPlanDetails={trainingPlanDetails}
          setTrainingPlanDetails={setTrainingPlanDetails}
        />
      )}
      <div className="main-dashboard">
        <div className="tp-tasklist">
          <div className="tp-details">
            <p className="tp-heading">Training Plan Details</p>

            <div className="tp-deet">
              <p className="bold">{trainingPlanDetails.title}</p>
              <p className="normal">{trainingPlanDetails.description}</p>
            </div>
            <div className="tp-more">
              <div className="tp-deet">
                <p className="bold">Total Tasks</p>
                <p className="normal">{trainingPlanDetails.totalTasks}</p>
              </div>
              <div className="tp-deet">
                <p className="bold">Easy Tasks</p>
                <p className="normal">{trainingPlanDetails.easyTasksCount}</p>
              </div>
              <div className="tp-deet">
                <p className="bold">Medium Tasks</p>
                <p className="normal">{trainingPlanDetails.mediumTasksCount}</p>
              </div>
              <div className="tp-deet">
                <p className="bold">Hard Tasks</p>
                <p className="normal">{trainingPlanDetails.hardTasksCount}</p>
              </div>
              {/* <div className="tp-deet">
                <p className="bold">System Generated</p>
                <p className="normal">
                  {trainingPlanDetails.isSystemGenerated ? "Yes" : "No"}
                </p>
              </div> */}
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
                onClick={() => {
                  handleAddTaskModalAction();
                  setMode("add");
                  setSelectedTask(null);
                }}
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
          {trainingPlanDetails.tasks.map((task, i) => (
            <div className="tp-task" key={task.id}>
              <div className="detail-group1">
                <p className="bold">{task.title}</p>
                <p className="normal">Description: {task.description}</p>
                <p className="normal">Difficulty: {task.difficulty}</p>

                <p className="normal">
                  Tech Stacks:{" "}
                  {task.techStacks.map((stack) => stack.name).join(", ")}
                </p>
                <p className="normal">
                  Skills: {task.skills.map((skill) => skill.name).join(", ")}
                </p>
              </div>
              <button
                className="button-main create"
                type="button"
                onClick={() => {
                  handleAddTaskModalAction();
                  setMode("edit");
                  setSelectedTask(task);
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrainingTaskList;

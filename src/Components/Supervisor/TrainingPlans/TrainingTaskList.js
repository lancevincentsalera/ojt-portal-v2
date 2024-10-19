import React, { useEffect, useState } from "react";
import AssignPlanModalController from "../Modals/TrainingPlans/controller/AssignPlanModalController";
import AddTaskModalController from "../Modals/TrainingPlans/controller/AddTaskModalController";
import { useLocation } from "react-router-dom";
import { fetchStudentsByMentor } from "./model/MentorTrainingPlanModel";
import { useAuth } from "../../Common/AuthContext";

const TrainingTaskList = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const handleAssignModalAction = () => setShowAssignModal(!showAssignModal);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const location = useLocation();
  const trainingPlanDetails =
    location.state?.trainingPlanDetails ||
    JSON.parse(localStorage.getItem("trainingPlanDetails"));
  const [students, setStudents] = useState(
    localStorage.getItem("students") != null
      ? JSON.parse(localStorage.getItem("students"))
      : []
  );
  const { userInfo } = useAuth();
  useEffect(() => {
    if (trainingPlanDetails) {
      localStorage.setItem(
        "trainingPlanDetails",
        JSON.stringify(trainingPlanDetails)
      );
    }
  }, [trainingPlanDetails]);

  useEffect(() => {
    if (students) {
      localStorage.setItem("students", JSON.stringify(students));
    }
  }, [students]);

  const getMentorInterns = async () => {
    try {
      const response = await fetchStudentsByMentor(userInfo.user.id);
      setStudents(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMentorInterns();
  }, []);

  const handleAddTaskModalAction = () => {
    console.log(showAddTaskModal);
    setShowAddTaskModal(!showAddTaskModal);
  };
  return (
    <>
      {showAssignModal && (
        <AssignPlanModalController
          handleAssignModalAction={handleAssignModalAction}
          trainingPlanDetails={trainingPlanDetails}
          students={students}
        />
      )}
      {showAddTaskModal && (
        <AddTaskModalController
          handleAddTaskModalAction={handleAddTaskModalAction}
          trainingPlanDetails={trainingPlanDetails}
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
              <div className="tp-deet">
                <p className="bold">System Generated</p>
                <p className="normal">
                  {trainingPlanDetails.isSystemGenerated ? "Yes" : "No"}
                </p>
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrainingTaskList;

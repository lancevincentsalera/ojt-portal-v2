import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import TaskScoringModalController from "../../Modals/TaskMonitoring/controller/TaskScoringModalController";

const TaskMonitoringView = ({
  mentorInterns,
  tasks,
  handleChange,
  error,
  isError,
  showModal,
  handleModalAction,
  task,
  internId,
}) => {
  console.log(tasks, "=============================================<>s");
  const getStatusText = (status) => {
    switch (status) {
      case "NotStarted":
        return "Not Started";
      case "InProgress":
        return "In Progress";
      case "Done":
        return "Completed";
      case "DoneLate":
        return "Late Completion";
      default:
        return "Not Started";
    }
  };
  return (
    <>
      {showModal && (
        <TaskScoringModalController
          showModal={showModal}
          handleModalAction={handleModalAction}
          task={task}
          internId={internId}
        />
      )}
      <div className="main-dashboard">
        <div className="main-header">
          <p className="main-heading">Task Monitoring</p>
        </div>
        <div className="main-content">
          <label htmlFor="interns">Select Intern:</label>
          <select defaultValue={""} name="interns" onChange={handleChange}>
            <option value="" disabled>
              Select Intern
            </option>
            {mentorInterns &&
              mentorInterns.map((intern) => {
                return (
                  <option key={intern.user.id} value={intern.user.id}>
                    {intern.user.firstName} {intern.user.lastName} —{" "}
                    {intern.division}
                  </option>
                );
              })}
          </select>

          <p className="sub-heading">
            This view allows you to monitor tasks assigned to your intern. The
            "Score" button will appear when a task is marked as "Done" or "Done
            Late" and has not yet been scored.
          </p>
          <div className="tp-tasklist">
            <span
              style={{
                fontSize: "80%",
                fontWeight: "bold",
                margin: "0.5rem 0 0 0",
              }}
            >
              Tasks
            </span>
            {!isError ? (
              tasks.map((task, i) => {
                return (
                  <div className="tp-task" key={task.trainingTask.id}>
                    <div className="detail-group1">
                      <p className="bold">{task.trainingTask.title}</p>
                      <p className="normal">
                        Description: {task.trainingTask.description}
                      </p>
                      <p className="normal">
                        Difficulty: {task.trainingTask.difficulty}
                      </p>
                      <p className="normal">
                        Status: {getStatusText(task.taskStatus)}
                      </p>
                      <p className="normal">
                        Score:{" "}
                        {task.taskStatus === "Done" ||
                        task.taskStatus === "DoneLate"
                          ? task.score === 0
                            ? "Not scored"
                            : task.score
                          : "Not yet subject to scoring"}
                      </p>
                    </div>
                    {(task.taskStatus === "Done" ||
                      task.taskStatus === "DoneLate") &&
                      task.score === 0 && (
                        <button
                          type="button"
                          className="button-main create"
                          onClick={() =>
                            handleModalAction(task.trainingTask.id)
                          }
                        >
                          Score
                        </button>
                      )}
                  </div>
                );
              })
            ) : (
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  gap: "0.5rem",
                  color: "#ff6b6b",
                }}
              >
                <FaGraduationCap size={50} />
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskMonitoringView;

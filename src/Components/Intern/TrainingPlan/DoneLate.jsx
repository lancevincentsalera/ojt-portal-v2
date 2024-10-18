import React from "react";

const DoneLateTasks = ({ tasks, handleModalAction }) => {
  return (
    <div className="tp-tasklist">
      {tasks.length === 0 ? (
        <p className="text-xs">No submitted late tasks available</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="tp-task past-due">
            <div className="detail-group1">
              <p className="bold">{task.trainingTask.title}</p>
              <p className="normal">Due: {task.dueDate || "N/A"}</p>
              <p className="normal">{task.trainingTask.description}</p>
            </div>
            <button
              type="button"
              className="button-main create"
              onClick={() => handleModalAction(task)}
            >
              View
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default DoneLateTasks;

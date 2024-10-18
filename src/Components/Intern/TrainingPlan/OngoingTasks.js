import React from "react";

const OngoingTasks = ({ tasks, handleModalAction }) => {
  return (
    <div className="tp-tasklist">
      {tasks.length === 0 ? (
        <p className="text-xs">No ongoing tasks available</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="tp-task">
            <div className="detail-group1">
              <p className="bold">{task.trainingTask.title}</p>
              <p className="normal">{task.trainingTask.description}</p>
              <p className="normal">Due: {task.dueDate || "N/A"}</p>
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

export default OngoingTasks;

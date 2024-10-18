import React from "react";

const PastDueTasks = ({ tasks }) => {
  return (
    <div className="tp-tasklist">
      {tasks.length === 0 ? (
        <p className="text-xs">No past due tasks available</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="tp-task past-due">
            <div className="detail-group1">
              <p className="bold">{task.trainingTask.title}</p>
              <p className="normal">Due: {task.dueDate || "N/A"}</p>
              <p className="normal">{task.trainingTask.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PastDueTasks;

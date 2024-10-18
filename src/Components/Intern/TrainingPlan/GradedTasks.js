import React from "react";

const GradedTasks = ({ tasks }) => {
  return (
    <div className="tp-tasklist">
      {tasks.length === 0 ? (
        <p className="text-xs">No graded tasks available</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="tp-task">
            <div className="detail-group1">
              <p className="bold">{task.trainingTask.title}</p>
              <p className="normal">{task.trainingTask.description}</p>
              <p className="normal">Score: {task.score}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GradedTasks;

import React from "react";

const ViewDashboardTasksView = ({ showModal, handleModalAction, selectedTask }) => {
  if (!selectedTask) return null; 

  return (
    <>
      <div className="modal-overlay" onClick={handleModalAction}></div>
      <div className="modal">
        <div className="modal-content" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <div className="modal-header">
            <p className="heading">View Task Details</p>
          </div>
          <form className="modal-form no-subh">
            <div className="view-task-details">
              <div className="view-task-group">
                <p className="view-task-title">Task Title</p>
                <p className="view-task-desc">{selectedTask.trainingTask.title}</p>
              </div>

              <div className="view-task-group">
                <p className="view-task-title">Description</p>
                <p className="view-task-desc">{selectedTask.trainingTask.description}</p>
              </div>

              <div className="view-task-group">
                <p className="view-task-title">Tech Stacks</p>
                <ul className="view-task-desc">
                  {selectedTask.trainingTask.techStacks.map((tech) => (
                    <li key={tech.id} style={{fontSize: 15}}>
                      {tech.name} - {tech.type} ({tech.description})
                    </li>
                  ))}
                </ul>
              </div>

              <div className="view-task-group">
                <p className="view-task-title">Skills</p>
                <ul className="view-task-desc">
                  {selectedTask.trainingTask.skills.map((skill) => (
                    <li key={skill.id} style={{fontSize: 15}}>
                      {skill.name} - {skill.description}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="view-task-group">
                <p className="view-task-title">Task Status</p>
                <p className="view-task-desc">{selectedTask.taskStatus}</p>
              </div>

              <div className="view-task-group">
                <p className="view-task-title">Due Date</p>
                <p className="view-task-desc">
                  {selectedTask.dueDate ? selectedTask.dueDate : "No due date available"}
                </p>
              </div>

              <div className="mark-check">
                <input type="checkbox" id="markComplete" className="checkbox" />
                <label htmlFor="markComplete" className="checkbox-label">
                  Mark as Completed
                </label>
              </div>
            </div>

            <div className="button-group double">
              <button
                type="button"
                className="button-secondary"
                onClick={handleModalAction}
              >
                Cancel
              </button>
              <button type="submit" className="button-main">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ViewDashboardTasksView;

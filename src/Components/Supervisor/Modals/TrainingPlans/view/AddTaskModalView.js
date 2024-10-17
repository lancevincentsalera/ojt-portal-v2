import React from "react";

const AddTaskModalView = ({ handleAddTaskModalAction }) => {
  return (
    <>
      <div className="modal-overlay" onClick={handleAddTaskModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">Add Task</p>
            <span className="close" onClick={handleAddTaskModalAction}>
              &times;
            </span>
          </div>
          <form className="modal-form no-subh">
            <input
              type="text"
              id="taskTitle"
              name="taskTitle"
              placeholder="Task Title"
            />
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              className="large-textarea"
            />
            <label htmlFor="dueDate">Due Date</label>
            <input type="date" id="dueDate" name="dueDate" />
            <input
              type="number"
              id="totalScore"
              name="totalScore"
              placeholder="Total Score"
            />
            <div className="button-group double">
              <button
                type="button"
                className="button-secondary"
                onClick={handleAddTaskModalAction}
              >
                Cancel
              </button>
              <button type="submit" className="button-main">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTaskModalView;

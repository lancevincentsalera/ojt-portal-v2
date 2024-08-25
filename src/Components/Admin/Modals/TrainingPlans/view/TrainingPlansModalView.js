import React from "react";

const TrainingPlansModalView = ({ showModal, handleModalAction }) => {
  return (
    <>
      <div className="modal-overlay" onClick={handleModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">Tasks</p>
          </div>
          <div className="modal-form no-subh">
            <div className="task-list">
              <div className="task">
                <p className="task-title">Task 1</p>
                <p className="task-desc">Description of Task 1</p>
                <p className="task-date">Due Date: 01/01/2021</p>
                <p className="task-status">Status: Pending</p>
              </div>
              <div className="task">
                <p className="task-title">Task 2</p>
                <p className="task-desc">Description of Task 2</p>
                <p className="task-date">Due Date: 01/01/2021</p>
                <p className="task-status">Status: Pending</p>
              </div>
              <div className="task">
                <p className="task-title">Task 3</p>
                <p className="task-desc">Description of Task 3</p>
                <p className="task-date">Due Date: 01/01/2021</p>
                <p className="task-status">Status: Pending</p>
              </div>

              <div className="task">
                <p className="task-title">Task 3</p>
                <p className="task-desc">Description of Task 3</p>
                <p className="task-date">Due Date: 01/01/2021</p>
                <p className="task-status">Status: Pending</p>
              </div>
            </div>

            <div className="button-group single">
              <button
                type="button"
                className="button-main single"
                onClick={handleModalAction}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainingPlansModalView;

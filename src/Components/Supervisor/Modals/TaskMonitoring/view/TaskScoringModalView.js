import React from "react";

const TaskScoringModalView = ({ showModal, handleModalAction }) => {
  return (
    <>
      <div className="modal-overlay" onClick={handleModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">Scoring</p>
            <span className="close" onClick={handleModalAction}>
              &times;
            </span>
          </div>
          <form
            className="modal-form no-subh"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="score">Score:</label>
            <input
              type="number"
              step="0.1"
              name="score"
              id="score"
              placeholder=""
            />

            <div className="button-group double">
              <button type="button" className="button-secondary">
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

export default TaskScoringModalView;

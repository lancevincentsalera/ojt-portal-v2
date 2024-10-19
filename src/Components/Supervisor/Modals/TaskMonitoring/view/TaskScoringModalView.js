import React from "react";

const TaskScoringModalView = ({
  showModal,
  handleModalAction,
  handleScoreChange,
  handleScoreAction,
}) => {
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
              handleScoreAction();
            }}
          >
            <label htmlFor="score">Score:</label>
            <input
              type="number"
              step="0.1"
              name="score"
              id="score"
              placeholder="Score (1.0 - 5.0)"
              onChange={handleScoreChange}
              required
            />

            <div className="button-group double">
              <button
                type="button"
                className="button-secondary"
                onClick={handleModalAction}
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

export default TaskScoringModalView;

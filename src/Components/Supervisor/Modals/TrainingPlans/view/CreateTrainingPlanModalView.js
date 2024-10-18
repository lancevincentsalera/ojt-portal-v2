import React from "react";

const CreateTrainingPlanModalView = ({
  showModal,
  handleModalAction,
  handleChange,
  handleCreateTrainingPlan,
}) => {
  return (
    <>
      <div className="modal-overlay" onClick={handleModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">Create Training Plan</p>
            <span className="close" onClick={handleModalAction}>
              &times;
            </span>
          </div>
          <form
            className="modal-form no-subh"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateTrainingPlan();
            }}
          >
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
              onChange={handleChange}
            />
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              className="large-textarea"
              required
              onChange={handleChange}
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

export default CreateTrainingPlanModalView;

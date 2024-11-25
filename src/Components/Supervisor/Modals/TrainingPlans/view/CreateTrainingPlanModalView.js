import React from "react";

const CreateTrainingPlanModalView = ({
  showModal,
  handleModalAction,
  handleChange,
  handleCreateTrainingPlan,
  mode,
  selectedTrainingPlan,
}) => {
  return (
    <>
      <div className="modal-overlay" onClick={handleModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">
              {mode === "copy"
                ? "Make a Copy"
                : `${mode === "create" ? "Create" : "Edit"} Training Plan`}
            </p>
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
              value={selectedTrainingPlan.title}
              maxLength={30}
            />
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              className="large-textarea"
              required
              onChange={handleChange}
              value={selectedTrainingPlan.description}
              maxLength={200}
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

import React from "react";

const CreateTrainingPlanModalView = ({ showModal, handleModalAction }) => {
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
          <form className="modal-form no-subh">
            <input type="text" id="title" name="title" placeholder="Title" />
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              className="large-textarea"
            />
            <div className="tapad">
              <label htmlFor="startDate">Start Date</label>
              <label htmlFor="endDate">End Date</label>
            </div>
            <div className="tapad">
              <input name="startDate" className="startDate" type="date" />
              <input name="endDate" className="endDate" type="date" />
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

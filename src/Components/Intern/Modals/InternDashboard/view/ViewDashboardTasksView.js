import React from "react";

const ViewDashboardTasksView = ({ showModal, handleModalAction }) => {
  return (
    <>
      <div className="modal-overlay" onClick={handleModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">View Tasks</p>
          </div>
          <form className="modal-form no-subh">
            <div className="view-task-details">
              <div className="view-task-group">
                <p className="view-task-title">Task Title</p>
                <p className="view-task-desc">
                  Design the new landing page for the company website.
                </p>
              </div>
              <div className="view-task-group">
                <p className="view-task-title">Description</p>
                <p className="view-task-desc">
                  The task involves creating a modern, responsive design for the
                  company’s new landing page. The design should align with the
                  brand guidelines and include sections for testimonials,
                  product highlights, and a call-to-action.
                </p>
              </div>
              <div className="view-task-group">
                <p className="view-task-title">Due Date</p>
                <p className="view-task-desc">June 30, 2023</p>
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
              <button type="submit" className="button-main ">
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

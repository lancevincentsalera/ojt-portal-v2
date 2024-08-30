import React from "react";

const ViewLogbookModalView = ({ showModal, handleModalAction }) => {
  return (
    <>
      <div className="modal-overlay" onClick={handleModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">Jun 09 Logbook</p>
          </div>
          <div className="modal-form no-subh">
            <div className="entry-content-list">
              <div className="entry-content-group date">
                <p className="label">Date of Entry:</p>
                <p className="value">Jun 09, 2024</p>
              </div>
              <div className="entry-content-group">
                <p className="label">Activities</p>
                <p className="entry-content">
                  Completed the quarterly financial report and presented it to
                  the management team. Also conducted a team meeting to discuss
                  project milestones and deadlines.
                </p>
              </div>
              <div className="entry-content-group">
                <p className="label">Remarks</p>
                <p className="entry-content">
                  Supervisor's feedback goes here. This is a detailed remark
                  provided by the supervisor based on the activities done.
                </p>
              </div>
            </div>
            <div className="button-group single">
              <button
                type="button"
                className="button-main "
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

export default ViewLogbookModalView;

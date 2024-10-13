import React from "react";

const ViewLogbookModalView = ({ showModal, handleModalAction, selectedLogbook }) => {
  if (!selectedLogbook) return null;

  const creationDate = new Date(selectedLogbook.creationTimestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <>
      <div className="modal-overlay" onClick={handleModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">{`${creationDate} Logbook`}</p>
          </div>
          <div className="modal-form no-subh">
            <div className="entry-content-list">
              <div className="entry-content-group date">
                <p className="label">Date of Entry:</p>
                <p className="value">{creationDate}</p>
              </div>
              <div className="entry-content-group">
                <p className="label">Activities</p>
                <p className="entry-content">{selectedLogbook.activities}</p>
              </div>
              <div className="entry-content-group">
                <p className="label">Remarks</p>
                <p className="entry-content">{selectedLogbook.remarks || "No remarks provided."}</p>
              </div>
            </div>
            <div className="button-group single">
              <button
                type="button"
                className="button-main"
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

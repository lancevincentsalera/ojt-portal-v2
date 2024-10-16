import React from "react";

const LogbookSubmissionsModalView = ({
  showModal,
  handleModalAction,
  logbook,
}) => {
  const date = new Date(logbook.creationTimestamp);
  const formatDate = (includeYear) => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      ...(includeYear && { year: "numeric" }),
    });
  };
  return (
    <>
      <div className="modal-overlay" onClick={handleModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">{formatDate(false)} Logbook</p>
          </div>
          <div className="modal-form no-subh">
            <div className="entry-content-list">
              <div className="entry-content-group date">
                <p className="label">Date of Entry:</p>
                <p className="value">{formatDate(true)}</p>
              </div>
              <div className="entry-content-group">
                <p className="label">Activities</p>
                <p className="entry-content">{logbook.activities}</p>
              </div>
              <div className="entry-content-group">
                <p className="label">Remarks</p>
                {logbook.remarks.length > 0 ? (
                  <p className="entry-content">{logbook.remarks}</p>
                ) : (
                  <textarea className="large-textarea" />
                )}
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

export default LogbookSubmissionsModalView;

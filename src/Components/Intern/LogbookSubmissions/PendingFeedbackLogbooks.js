import React from "react";

const PendingFeedbackLogbooks = ({
  logbooks,
  handleModalAction,
  setSelectedLogbook,
}) => {
  return (
    <div className="logbook-entry-list">
      {logbooks.map((logbook, index) => {
        const creationDate = new Date(
          logbook.creationTimestamp.replace(/ \+\d{2}:\d{2}$/, "")
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
        const submissionDate = new Date(
          logbook.submissionTimestamp.replace(/ \+\d{2}:\d{2}$/, "")
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });

        return (
          <div key={index} className="logbook-entry">
            <div className="logbook-entry-content">
              <p className="logbook-entry-title">{`${creationDate} Logbook`}</p>
              <p className="logbook-entry-date">{`Submitted on: ${submissionDate}`}</p>
            </div>

            <button
              type="button"
              className="button-main create"
              onClick={() => {
                setSelectedLogbook(logbook);
                handleModalAction();
              }}
            >
              View
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PendingFeedbackLogbooks;

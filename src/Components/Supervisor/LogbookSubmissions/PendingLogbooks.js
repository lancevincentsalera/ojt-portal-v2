import React from "react";

const PendingLogbooks = ({ logbooks, handleModalAction }) => {
  return (
    <div className="table-container">
      <div className="table">
        <ul className="thead">
          <li className="th">Intern Name</li>
          <li className="th">Department</li>
          <li className="th">Submission Date</li>
          <li className="th">Submission Status</li>
          <li className="th">Feedback Status</li>
          <li className="th">Action</li>
        </ul>
        <ul className="tbody">
          {logbooks.map((logbook, i) => {
            const date = new Date(logbook.creationTimestamp);
            const formattedDate = date.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
            return (
              <li className="tr" key={i}>
                <p className="td">{`${logbook.internInfo.user.firstName} ${logbook.internInfo.user.lastName}`}</p>
                <p className="td">{logbook.internInfo.division}</p>
                <p className="td">{formattedDate}</p>
                <p className="td">{logbook.logbookStatus}</p>
                <p className="td">Pending</p>
                <div className="td actions">
                  <button
                    type="button"
                    className="button-main btn-active"
                    onClick={() => handleModalAction(i, true)}
                  >
                    View Submission
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PendingLogbooks;

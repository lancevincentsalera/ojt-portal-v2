import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const PendingLogbooks = ({ logbooks, handleModalAction }) => {
  return (
    <div className="table-container">
      <div className="table">
        <ul className="thead">
          <li className="th">Intern Name</li>
          <li className="th">Department</li>
          <li className="th">Attendance Date</li>
          <li className="th">Submission Status</li>
          <li className="th">Feedback Status</li>
          <li className="th">Action</li>
        </ul>
        <ul className="tbody">
          {logbooks.length > 0 ? (
            logbooks.map((logbook, i) => {
              const date = new Date(
                logbook.attendance.timeIn.replace(/ \+\d{2}:\d{2}$/, "")
              );
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
            })
          ) : (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                gap: "0.5rem",
                color: "#ff6b6b",
              }}
            >
              <FaGraduationCap size={50} />
              No recent logbook submissions
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PendingLogbooks;

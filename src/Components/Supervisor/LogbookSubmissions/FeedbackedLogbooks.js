import React from "react";

const FeedbackedLogbooks = ({ logbooks, handleShowModalAction }) => {
  return (
    <div className="table-container">
      <div className="table">
        <ul className="thead">
          <li className="th">Intern Name</li>
          <li className="th">Department</li>
          <li className="th">Attendance Date</li>
          <li className="th">Submission Date</li>
          <li className="th">Submission Status</li>
          <li className="th">Feedback Status</li>
          <li className="th">Action</li>
        </ul>
        <ul className="tbody">
          {logbooks.map((logbook, i) => {
            const attendanceDate = new Date(logbook.attendance.timeIn);
            const submissionDate = new Date(
              logbook.submissionTimestamp.replace(/ \+\d{2}:\d{2}$/, "")
            );
            const options = {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            };

            const formattedAttendanceDate = attendanceDate.toLocaleString(
              "en-US",
              options
            );
            const formattedSubmissionDate = submissionDate.toLocaleString(
              "en-US",
              options
            );
            return (
              <li className="tr" key={i}>
                <p className="td">{`${logbook.internInfo.user.firstName} ${logbook.internInfo.user.lastName}`}</p>
                <p className="td">{logbook.internInfo.division}</p>
                <p className="td">{formattedAttendanceDate}</p>
                <p className="td">{formattedSubmissionDate}</p>
                <p className="td">{logbook.logbookStatus}</p>
                <p className="td">Feedbacked</p>
                <div className="td actions">
                  <button
                    type="button"
                    className="button-main btn-active"
                    onClick={() => handleShowModalAction(i, false)}
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

export default FeedbackedLogbooks;

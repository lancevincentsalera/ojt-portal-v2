import React from "react";

const RecentLogbookSubmissions = ({ LogbookSubmissions }) => {
  console.log(LogbookSubmissions, " ========================");
  return (
    <div className="large-card-container">
      <div className="large-card-heading">Recent Logbook Submissions</div>
      <ul className="large-card-list">
        {LogbookSubmissions.map((submission, key) => {
          console.log(submission, " ========================");
          return (
            <li key={key} className="list-value">
              <p className="intern-name">{submission.internName}</p>
              <p className="submission-time">{submission.submissionTime}</p>
              <button type="button" className="button-main create">
                View
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentLogbookSubmissions;

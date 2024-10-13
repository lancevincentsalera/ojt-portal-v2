import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const RecentLogbookSubmissions = ({ LogbookSubmissions }) => {
  return (
    <div className="large-card-container">
      <div className="large-card-heading">Recent Logbook Submissions</div>
      <ul className="large-card-list">
        {LogbookSubmissions.length > 0 ? (
          LogbookSubmissions.map((submission, key) => {
            return (
              <li key={key} className="list-value">
                <p className="intern-name">{submission.internName}</p>
                <p className="submission-time">{submission.submissionTime}</p>
                <button type="button" className="button-main create">
                  View
                </button>
              </li>
            );
          })
        ) : (
          <p className="empty">This emptiness...</p>
        )}
      </ul>
    </div>
  );
};

export default RecentLogbookSubmissions;

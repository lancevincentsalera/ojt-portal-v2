import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const RecentLogbookSubmissions = ({ LogbookSubmissions }) => {
  console.log(LogbookSubmissions);
  return (
    <div className="large-card-container">
      <div className="large-card-heading">Recent Logbook Submissions</div>
      <ul className="large-card-list">
        {LogbookSubmissions.length > 0 ? (
          LogbookSubmissions.map((submission, key) => {
            const date = new Date(submission.creationTimestamp);
            const formattedDate = date.toLocaleString({
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
            return (
              <li key={key} className="list-value">
                <p className="intern-name">{`${submission.internInfo.user.firstName} ${submission.internInfo.user.lastName}`}</p>
                <p className="submission-time">{formattedDate}</p>
                <button type="button" className="button-main create">
                  View
                </button>
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
  );
};

export default RecentLogbookSubmissions;

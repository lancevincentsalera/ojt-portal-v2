import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const RecentLogbookSubmissions = ({
  LogbookSubmissions,
  handleModalAction,
}) => {
  const timeAgo = (timestamp) => {
    const now = new Date();
    const submissionDate = new Date(timestamp);
    const differenceInSeconds = Math.floor((now - submissionDate) / 1000);

    const minutes = 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const months = days * 30;
    const years = days * 365;

    if (differenceInSeconds < minutes) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < hours) {
      const minutesAgo = Math.floor(differenceInSeconds / minutes);
      return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
    } else if (differenceInSeconds < days) {
      const hoursAgo = Math.floor(differenceInSeconds / hours);
      return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
    } else if (differenceInSeconds < months) {
      const daysAgo = Math.floor(differenceInSeconds / days);
      return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
    } else if (differenceInSeconds < years) {
      const monthsAgo = Math.floor(differenceInSeconds / months);
      return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
    } else {
      const yearsAgo = Math.floor(differenceInSeconds / years);
      return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
    }
  };
  return (
    <div className="large-card-container">
      <div className="large-card-heading">Recent Logbook Submissions</div>
      <ul className="large-card-list">
        {LogbookSubmissions.length > 0 ? (
          LogbookSubmissions.map((submission, key) => {
            const formattedDate = timeAgo(submission.creationTimestamp);
            return (
              <li key={key} className="list-value">
                <p className="intern-name">{`${submission.internInfo.user.firstName} ${submission.internInfo.user.lastName}`}</p>
                <p className="submission-time">{formattedDate}</p>
                <button
                  type="button"
                  className="button-main create"
                  onClick={() => handleModalAction(key)}
                >
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

import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const RecentLogbookSubmissions = ({
  LogbookSubmissions,
  handleModalAction,
}) => {
  const isWithinLast24Hours = (timestamp) => {
    const now = new Date();
    const submissionDate = new Date(timestamp.replace(/ \+\d{2}:\d{2}$/, ""));
    const differenceInSeconds = Math.floor((now - submissionDate) / 1000);
    return differenceInSeconds <= 24 * 60 * 60; // True if within 24 hours
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const submissionDate = new Date(timestamp.replace(/ \+\d{2}:\d{2}$/, ""));
    let differenceInSeconds = Math.floor((now - submissionDate) / 1000);
    differenceInSeconds %= 24 * 60 * 60;

    const intervals = [
      { label: "hour", seconds: 60 * 60 },
      { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(differenceInSeconds / interval.seconds);
      if (count >= 1) {
        const label = interval.label;
        if (count === 1) {
          return label === "hour" ? `an ${label} ago` : `a ${label} ago`;
        }
        return `${count} ${label}s ago`;
      }
    }

    return differenceInSeconds === 1
      ? "a second ago"
      : `${differenceInSeconds} seconds ago`;
  };

  const recentLogbooks = LogbookSubmissions.filter((submission) =>
    isWithinLast24Hours(submission.creationTimestamp)
  );

  return (
    <div className="large-card-container">
      <div className="large-card-heading">Recent Logbook Submissions</div>
      <ul className="large-card-list">
        {recentLogbooks.length > 0 ? (
          recentLogbooks.map((submission, key) => {
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

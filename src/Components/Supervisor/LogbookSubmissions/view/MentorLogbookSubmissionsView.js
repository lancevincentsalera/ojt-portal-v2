import React from "react";
import PendingLogbooks from "../PendingLogbooks";
import FeedbackedLogbooks from "../FeedbackedLogbooks";

const MentorLogbookSubmissionsView = ({
  tab,
  handleTabChange,
  pendingLogbooks,
  feedbackedLogbooks,
}) => {
  return (
    <div className="main-dashboard">
      <div className="main-header">
        <p className="main-heading">Logbook Submissions</p>
      </div>
      <div className="main-content">
        <div className="tabs" style={{ justifyContent: "normal" }}>
          <div
            className={tab.pending ? "tab active" : "tab"}
            onClick={() => {
              handleTabChange(true, false);
            }}
            style={{ width: "15%" }}
          >
            Pending Feedback
          </div>
          <div
            className={tab.feedbacked ? "tab active" : "tab"}
            onClick={() => {
              handleTabChange(false, true);
            }}
            style={{ width: "15%" }}
          >
            Feedbacked
          </div>
        </div>
        {tab.pending && <PendingLogbooks logbooks={pendingLogbooks} />}
        {tab.feedbacked && <FeedbackedLogbooks logbooks={feedbackedLogbooks} />}
      </div>
    </div>
  );
};

export default MentorLogbookSubmissionsView;
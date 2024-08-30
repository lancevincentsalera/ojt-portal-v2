import React from "react";
import PendingFeedbackLogbooks from "../PendingFeedbackLogbooks";
import FeedbackedLogbooks from "../FeedbackedLogbooks";

const SubmissionsView = ({
  showModal,
  handleModalAction,
  tab,
  handleTabChange,
}) => {
  return (
    <>
      <div className="main-dashboard">
        <div className="main-header">
          <p className="main-heading">My Logbooks</p>
        </div>
        <div className="tabs">
          <div
            className={tab.pending ? "tab active" : "tab"}
            onClick={() => {
              handleTabChange(true, false);
            }}
          >
            Pending Feedback
          </div>
          <div
            className={tab.feedbacked ? "tab active" : "tab"}
            onClick={() => {
              handleTabChange(false, true);
            }}
          >
            Feedbacked
          </div>
        </div>
        {tab.pending && (
          <PendingFeedbackLogbooks
            showModal={showModal}
            handleModalAction={handleModalAction}
          />
        )}
        {tab.feedbacked && (
          <FeedbackedLogbooks
            showModal={showModal}
            handleModalAction={handleModalAction}
          />
        )}
      </div>
    </>
  );
};

export default SubmissionsView;

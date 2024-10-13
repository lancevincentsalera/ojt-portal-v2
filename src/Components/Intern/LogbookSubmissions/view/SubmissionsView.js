import React from "react";
import PendingFeedbackLogbooks from "../PendingFeedbackLogbooks";
import FeedbackedLogbooks from "../FeedbackedLogbooks";
import ViewLogbookModalController from "../../Modals/LogbookSubmissions/controller/ViewLogbookModalController";

const SubmissionsView = ({
  showModal,
  handleModalAction,
  tab,
  handleTabChange,
  logbooks,
}) => {
  const pendingLogbooks = logbooks.filter(
    (logbook) => logbook.logbookStatus === "Pending"
  );
  const feedbackedLogbooks = logbooks.filter(
    (logbook) => logbook.logbookStatus === "Submitted"
  );
  return (
    <>
      {showModal && (
        <ViewLogbookModalController
          showModal={showModal}
          handleModalAction={handleModalAction}
        />
      )}
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
            logbooks={pendingLogbooks}
          />
        )}
        {tab.feedbacked && (
          <FeedbackedLogbooks
            showModal={showModal}
            handleModalAction={handleModalAction}
            logbooks={feedbackedLogbooks}
          />
        )}
      </div>
    </>
  );
};

export default SubmissionsView;

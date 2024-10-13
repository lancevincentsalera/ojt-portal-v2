import React from "react";
import PendingFeedbackLogbooks from "../PendingFeedbackLogbooks";
import FeedbackedLogbooks from "../FeedbackedLogbooks";
import ViewLogbookModalController from "../../Modals/LogbookSubmissions/controller/ViewLogbookModalController";

const SubmissionsView = ({
  showModal,
  handleModalAction,
  tab,
  handleTabChange,
}) => {
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

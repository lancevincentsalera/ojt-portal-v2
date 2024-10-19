import React from "react";
import OverviewSection from "../OverviewSection";
import RecentLogbookSubmissions from "../RecentLogbookSubmissions";
import LogbookSubmissionsModalController from "../../Modals/LogbookSubmissions/controller/LogbookSubmissionsModalController";

const SupervisorDashboardView = ({
  LogbookSubmissions,
  pendingLogbookSubmissions,
  TotalInterns,
  showModal,
  handleModalAction,
  logbook,
}) => {
  return (
    <>
      {showModal && (
        <LogbookSubmissionsModalController
          showModal={showModal}
          handleModalAction={handleModalAction}
          logbook={logbook}
        />
      )}
      <div className="main-dashboard">
        <div className="supervisor-dashboard">
          <OverviewSection
            pendingLogbookSubmissions={pendingLogbookSubmissions}
            TotalInterns={TotalInterns}
          />
          <RecentLogbookSubmissions
            LogbookSubmissions={LogbookSubmissions}
            handleModalAction={handleModalAction}
          />
        </div>
      </div>
    </>
  );
};

export default SupervisorDashboardView;

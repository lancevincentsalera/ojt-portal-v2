import React from "react";
import OverviewSection from "../OverviewSection";
import RecentLogbookSubmissions from "../RecentLogbookSubmissions";

const SupervisorDashboardView = ({
  LogbookSubmissions,
  pendingLogbookSubmissions,
  TotalInterns,
}) => {
  return (
    <div className="main-dashboard">
      <div className="supervisor-dashboard">
        <OverviewSection
          pendingLogbookSubmissions={pendingLogbookSubmissions}
          TotalInterns={TotalInterns}
        />
        <RecentLogbookSubmissions LogbookSubmissions={LogbookSubmissions} />
      </div>
    </div>
  );
};

export default SupervisorDashboardView;

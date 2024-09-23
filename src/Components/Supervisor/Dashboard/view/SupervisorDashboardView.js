import React from "react";
import OverviewSection from "../OverviewSection";
import RecentLogbookSubmissions from "../RecentLogbookSubmissions";

const SupervisorDashboardView = ({ LogbookSubmissions }) => {
  return (
    <div className="main-dashboard">
      <div className="supervisor-dashboard">
        <OverviewSection />
        <RecentLogbookSubmissions LogbookSubmissions={LogbookSubmissions} />
      </div>
    </div>
  );
};

export default SupervisorDashboardView;

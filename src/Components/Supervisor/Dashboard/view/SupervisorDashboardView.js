import React from "react";
import SmallsCardsSection from "../SmallCardsSection";
import InternsAtRisk from "../InternsAtRisk";
import TopPerformingInterns from "../TopPerformingInterns";
const SupervisorDashboardView = () => {
  return (
    <div className="main-dashboard">
      <div className="mentor-dashboard">
        <SmallsCardsSection />
        <InternsAtRisk />
        <TopPerformingInterns />
      </div>
    </div>
  );
};

export default SupervisorDashboardView;

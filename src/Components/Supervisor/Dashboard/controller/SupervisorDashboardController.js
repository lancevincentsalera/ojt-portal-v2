import React, { useState } from "react";
import SupervisorDashboardView from "../view/SupervisorDashboardView";
import { RecentlySubmittedLogbooks } from "../model/SupervisorDashboardModel";

const SupervisorDashboardController = () => {
  const [RecentLogbookSubmissions] = useState(RecentlySubmittedLogbooks);

  return (
    <SupervisorDashboardView LogbookSubmissions={RecentLogbookSubmissions} />
  );
};

export default SupervisorDashboardController;

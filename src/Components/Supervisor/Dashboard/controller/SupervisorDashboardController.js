import React, { useEffect, useState } from "react";
import SupervisorDashboardView from "../view/SupervisorDashboardView";
import {
  RecentlySubmittedLogbooks,
  LogbooksAwaitingFeedback,
} from "../model/SupervisorDashboardModel";
import { useAuth } from "../../../Common/AuthContext";

const SupervisorDashboardController = () => {
  const [RecentLogbookSubmissions, setRecentLogbookSubmissions] = useState([]);
  const [pendingLogbookSubmissions, setPendingLogbookSubmissions] = useState(0);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchAwaitingLogbooks = async () => {
      const response = await LogbooksAwaitingFeedback(userInfo);
      setPendingLogbookSubmissions(response.length);
    };

    const fetchRecentLogbooks = async () => {
      const response = await RecentlySubmittedLogbooks(userInfo);
      setRecentLogbookSubmissions(response);
    };

    fetchAwaitingLogbooks();
    fetchRecentLogbooks();
  }, [userInfo]);

  return (
    <SupervisorDashboardView
      LogbookSubmissions={RecentLogbookSubmissions}
      pendingLogbookSubmissions={pendingLogbookSubmissions}
      TotalInterns={userInfo.internCount}
    />
  );
};

export default SupervisorDashboardController;

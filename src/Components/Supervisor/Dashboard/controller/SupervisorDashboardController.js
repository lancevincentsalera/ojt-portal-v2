import React, { useEffect, useMemo, useState } from "react";
import SupervisorDashboardView from "../view/SupervisorDashboardView";
import { useAuth } from "../../../Common/AuthContext";
import { MentorDashboarModel } from "../model/SupervisorDashboardModel";

const SupervisorDashboardController = () => {
  const [RecentLogbookSubmissions, setRecentLogbookSubmissions] = useState([]);
  const [pendingLogbookSubmissions, setPendingLogbookSubmissions] = useState(0);
  const { userInfo } = useAuth();
  const { LogbooksAwaitingFeedback, RecentlySubmittedLogbooks, getInternInfo } =
    useMemo(() => MentorDashboarModel(), []);

  useEffect(() => {
    const fetchAwaitingLogbooks = async () => {
      const response = await LogbooksAwaitingFeedback(userInfo);
      setPendingLogbookSubmissions(response.length);
    };

    const fetchRecentLogbooks = async () => {
      try {
        const response = await RecentlySubmittedLogbooks(userInfo);
        const data = await Promise.all(
          response.map(async (logbook) => {
            const internInfo = await getInternInfo(
              logbook.attendance.studentId
            );
            return { ...logbook, internInfo };
          })
        );

        console.log(data, "looooooooooooooool");
        setRecentLogbookSubmissions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAwaitingLogbooks();
    fetchRecentLogbooks();
  }, [
    userInfo,
    LogbooksAwaitingFeedback,
    RecentlySubmittedLogbooks,
    getInternInfo,
  ]);

  return (
    <SupervisorDashboardView
      LogbookSubmissions={RecentLogbookSubmissions}
      pendingLogbookSubmissions={pendingLogbookSubmissions}
      TotalInterns={userInfo.internCount}
    />
  );
};

export default SupervisorDashboardController;

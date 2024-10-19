import React, { useEffect, useMemo, useState } from "react";
import SupervisorDashboardView from "../view/SupervisorDashboardView";
import { useAuth } from "../../../Common/AuthContext";
import { MentorDashboarModel } from "../model/SupervisorDashboardModel";
import LoadingModal from "../../../Common/Modals/LoadingModal";

const SupervisorDashboardController = () => {
  const [RecentLogbookSubmissions, setRecentLogbookSubmissions] = useState([]);
  const [pendingLogbookSubmissions, setPendingLogbookSubmissions] = useState(0);
  const { userInfo } = useAuth();
  const { LogbooksAwaitingFeedback, RecentlySubmittedLogbooks, getInternInfo } =
    useMemo(() => MentorDashboarModel(), []);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [logbook, setLogbook] = useState({});

  const handleModalAction = (index) => {
    setLogbook(RecentLogbookSubmissions[index]);
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchAwaitingLogbooks = async () => {
      setLoading(true);
      try {
        const response = await LogbooksAwaitingFeedback(userInfo);
        setPendingLogbookSubmissions(response.length);
      } catch (error) {
        console.error(error);
      }
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
      } finally {
        setLoading(false);
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
    <>
      <SupervisorDashboardView
        LogbookSubmissions={RecentLogbookSubmissions}
        pendingLogbookSubmissions={pendingLogbookSubmissions}
        TotalInterns={userInfo.internCount}
        showModal={showModal}
        handleModalAction={handleModalAction}
        logbook={logbook}
      />

      <LoadingModal open={loading} />
    </>
  );
};

export default SupervisorDashboardController;

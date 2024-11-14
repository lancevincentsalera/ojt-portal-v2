import React, { useEffect, useMemo, useState } from "react";
import SupervisorDashboardView from "../view/SupervisorDashboardView";
import { useAuth } from "../../../Common/AuthContext";
import { MentorDashboarModel } from "../model/SupervisorDashboardModel";
import LoadingModal from "../../../Common/Modals/LoadingModal";
import { GetInternList } from "../../InternList/model/InternListModel";

const SupervisorDashboardController = () => {
  const [RecentLogbookSubmissions, setRecentLogbookSubmissions] = useState([]);
  const [pendingLogbookSubmissions, setPendingLogbookSubmissions] = useState(0);
  const { userInfo } = useAuth();
  const { LogbooksAwaitingFeedback, RecentlySubmittedLogbooks, getInternInfo } =
    useMemo(() => MentorDashboarModel(), []);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [logbook, setLogbook] = useState({});
  const [ongoingInterns, setOngoingInterns] = useState(0);

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

    const fetchOngoingInterns = async () => {
      try {
        const response = await GetInternList(userInfo.user.id);
        setOngoingInterns(
          response.interns.filter(
            (intern) => intern.internshipStatus === "Ongoing"
          ).length
        );
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

        setRecentLogbookSubmissions(filterTodaysLogbooks(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAwaitingLogbooks();
    fetchRecentLogbooks();
    fetchOngoingInterns();
  }, [
    userInfo,
    LogbooksAwaitingFeedback,
    RecentlySubmittedLogbooks,
    getInternInfo,
  ]);

  const filterTodaysLogbooks = (logbooks) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return logbooks.filter(
      (logbook) =>
        new Date(logbook.creationTimestamp).setHours(0, 0, 0, 0).getDate() ===
        today.getDate()
    );
  };

  return (
    <>
      <SupervisorDashboardView
        LogbookSubmissions={RecentLogbookSubmissions}
        pendingLogbookSubmissions={pendingLogbookSubmissions}
        TotalInterns={userInfo.internCount}
        showModal={showModal}
        handleModalAction={handleModalAction}
        logbook={logbook}
        ongoingInterns={ongoingInterns}
      />

      <LoadingModal open={loading} />
    </>
  );
};

export default SupervisorDashboardController;

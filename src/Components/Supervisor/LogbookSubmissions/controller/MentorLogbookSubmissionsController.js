import React, { useEffect, useState } from "react";
import MentorLogbookSubmissionsView from "../view/MentorLogbookSubmissionsView";
import { useAuth } from "../../../Common/AuthContext";
import { useGlobalState } from "../../../Globals/variables";
import LoadingModal from "../../../Common/Modals/LoadingModal";

const MentorLogbookSubmissionsController = () => {
  const { userInfo } = useAuth();
  const [pendingLogbooks, setPendingLogbooks] = useState([]);
  const [feedbackedLogbooks, setFeedbackedLogbooks] = useState([]);
  const [tab, setTab] = useState({
    pending: true,
    feedbacked: false,
  });
  const { getMentorLogbookSubmissions, getInternInfo } = useGlobalState();
  const [showModal, setShowModal] = useState(false);
  const [logbook, setLogbook] = useState(null);

  const handleShowModalAction = (index, pending) => {
    setLogbook(pending ? pendingLogbooks[index] : feedbackedLogbooks[index]);
    setShowModal(!showModal);
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLogbooks = async () => {
      setLoading(true);
      try {
        const response = await getMentorLogbookSubmissions(userInfo.user.id);
        console.log(response);
        const data = await Promise.all(
          response.map(async (logbook) => {
            const internInfo = await getInternInfo(
              logbook.attendance.studentId
            );
            return { ...logbook, internInfo };
          })
        );
        setPendingLogbooks(
          data.filter((logbook) => logbook.remarks.length === 0)
        );
        setFeedbackedLogbooks(
          data.filter((logbook) => logbook.remarks.length > 0)
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogbooks();
  }, [userInfo.user.id, getMentorLogbookSubmissions, getInternInfo]);

  const handleTabChange = (m, f) => {
    setTab({ pending: m, feedbacked: f });
  };

  return (
    <>
      <MentorLogbookSubmissionsView
        tab={tab}
        handleTabChange={handleTabChange}
        pendingLogbooks={pendingLogbooks}
        feedbackedLogbooks={feedbackedLogbooks}
        showModal={showModal}
        handleShowModalAction={handleShowModalAction}
        logbook={logbook}
      />

      <LoadingModal open={loading} />
    </>
  );
};

export default MentorLogbookSubmissionsController;

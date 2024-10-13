import React, { useEffect, useState } from "react";
import MentorLogbookSubmissionsView from "../view/MentorLogbookSubmissionsView";
import { useAuth } from "../../../Common/AuthContext";
import {
  getInternInfo,
  getMentorLogbookSubmissions,
} from "../model/MentorLogbookSubmissionsModel";

const MentorLogbookSubmissionsController = () => {
  const { userInfo } = useAuth();
  const [pendingLogbooks, setPendingLogbooks] = useState([]);
  const [feedbackedLogbooks, setFeedbackedLogbooks] = useState([]);
  const [tab, setTab] = useState({
    pending: true,
    feedbacked: false,
  });

  useEffect(() => {
    const fetchLogbooks = async () => {
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
        console.log(data, "==================");
        setPendingLogbooks(
          data.filter((logbook) => logbook.remarks.length === 0)
        );
        setFeedbackedLogbooks((logbook) =>
          data.filter((logbook) => logbook.remarks.length > 0)
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchLogbooks();
  }, [userInfo.user.id]);

  const handleTabChange = (m, f) => {
    setTab({ pending: m, feedbacked: f });
  };

  return (
    <MentorLogbookSubmissionsView
      tab={tab}
      handleTabChange={handleTabChange}
      pendingLogbooks={pendingLogbooks}
      feedbackedLogbooks={feedbackedLogbooks}
    />
  );
};

export default MentorLogbookSubmissionsController;

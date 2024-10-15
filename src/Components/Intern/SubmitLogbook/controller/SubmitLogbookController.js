import React, { useEffect, useState } from "react";
import SubmitLogbookView from "../view/SubmitLogbookView";
import axios from "axios";
import { useAuth } from "../../../Common/AuthContext";
import OkayModal from "../../../Common/Modals/OkayModal";
import ErrorModal from "../../../Common/Modals/ErrorModal";
import LoadingModal from "../../../Common/Modals/LoadingModal";
import PromptModal from "../../../Common/Modals/PromptModal"; 

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const SubmitLogbookController = () => {
  const { userInfo, authUser } = useAuth();
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [attendanceId, setAttendanceId] = useState(0);
  const [activities, setActivities] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const handleSubmitLogbook = async () => {
    setIsSubmitting(true);
    try {
      const requestBody = {
        attendanceId,
        activities,
      };

      const response = await axios.post(`${apiBaseUrl}/logbooks`, requestBody, {
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`,
        },
      });

      console.log("Logbook entry added successfully:", response.data);
      setIsSubmitting(false);
      setIsSuccess(true);
      setActivities("");
      setAttendanceId(0);
    } catch (error) {
      console.error("Error adding logbook entry:", error);

      if (error.response && error.response.status === 422 && error.response.data.errors) {
        const errorDetail = error.response.data.errors[0]?.message || "An unknown error occurred.";
        setErrorMessage(errorDetail);
      } else {
        setErrorMessage("Error adding logbook entry.");
      }

      setIsSubmitting(false);
      setIsError(true);
    }
  };

  const handleConfirmSubmitLogbook = () => {
    setIsPromptOpen(true); 
  };

  const handleConfirm = async () => {
    setIsPromptOpen(false);
    await handleSubmitLogbook(); 
  };

  useEffect(() => {
    const fetchStudentAttendance = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/attendance/student/${userInfo.user.id}/logbook`,
          {
            headers: {
              Authorization: `Bearer ${authUser.accessToken}`,
            },
          }
        );
        setStudentAttendance(response.data);
        console.log("Fetched attendance:", response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudentAttendance();
  }, [userInfo, authUser]);

  return (
    <>
      <SubmitLogbookView
        studentAttendance={studentAttendance}
        attendanceId={attendanceId}
        setAttendanceId={setAttendanceId}
        activities={activities}
        setActivities={setActivities}
        handleSubmitLogbook={handleConfirmSubmitLogbook} 
      />

      <LoadingModal open={isSubmitting} />

      <OkayModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        message="Logbook entry added successfully!"
      />

      <ErrorModal
        open={isError}
        onClose={() => setIsError(false)}
        errorMessage={errorMessage}
      />

      <PromptModal
        open={isPromptOpen}
        onClose={() => setIsPromptOpen(false)}
        onConfirm={handleConfirm}
        message="Are you sure you want to submit the logbook entry?"
      />
    </>
  );
};

export default SubmitLogbookController;

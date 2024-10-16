import React, { useEffect, useState } from "react";
import InternDashboardView from "../view/InternDashboardView";
import { useAuth } from "../../../Common/AuthContext";
import axios from "axios";
import LoadingModal from "../../../Common/Modals/LoadingModal";
import OkayModal from "../../../Common/Modals/OkayModal";
import ErrorModal from "../../../Common/Modals/ErrorModal";
import PromptModal from "../../../Common/Modals/PromptModal";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const InternDashboardController = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [studentPerformance, setStudentPerformance] = useState();
  const { userInfo } = useAuth();

  useEffect(() => {
    if (userInfo && userInfo.user && userInfo.user.id) {
      fetchStudentPerformance(userInfo.user.id);
    }
  }, [userInfo]);

  const fetchStudentPerformance = async (id) => {
    setIsSubmitting(true);
    try {
      const response = await axios.get(`${apiBaseUrl}/students/${id}/performance`);
      setStudentPerformance(response.data);
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error) {
      const errorDetail = error.response?.data?.message || "Error fetching student performance.";
      setErrorMessage(errorDetail);
      setIsError(true);
      setIsSubmitting(false);
    }
  };

  const confirmActionHandler = (action) => {
    setConfirmAction(action);
    setIsPromptOpen(true);
  };

  const handleConfirm = async () => {
    setIsPromptOpen(false);
    if (confirmAction === 'fetchPerformance') {
      await fetchStudentPerformance(userInfo.user.id);
    }
  };

  return (
    <>
      <InternDashboardView
        showModal={showModal}
        handleModalAction={() => confirmActionHandler('fetchPerformance')}
        studentPerformance={studentPerformance}
      />

      <LoadingModal open={isSubmitting} />
      <OkayModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        message="Student performance fetched successfully!"
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
        message="Confirm fetching student performance?"
      />
    </>
  );
};

export default InternDashboardController;

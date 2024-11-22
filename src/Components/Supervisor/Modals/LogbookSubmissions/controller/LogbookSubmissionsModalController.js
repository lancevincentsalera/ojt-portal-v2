import React, { useState } from "react";
import LogbookSubmissionsModalView from "../view/LogbookSubmissionsModalView";
import axios from "axios";
import { useAuth } from "../../../../Common/AuthContext";
import LoadingModal from "../../../../Common/Modals/LoadingModal";
import OkayModal from "../../../../Common/Modals/OkayModal";
import ErrorModal from "../../../../Common/Modals/ErrorModal";
import PromptModal from "../../../../Common/Modals/PromptModal";

const LogbookSubmissionsModalController = ({
  showModal,
  handleModalAction,
  logbook,
}) => {
  const [logbookId] = useState(logbook.attendance.attendanceId);
  const url =
    process.env.REACT_APP_API_BASE_URL + `/logbooks/${logbookId}/remarks`;
  const [remarks, setRemarks] = useState("");
  const { authUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setRemarks(e.target.value);
  };

  const submitLogbookAction = async () => {
    try {
      console.log(authUser);
      const response = await axios.patch(
        url,
        {
          remarks: remarks,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authUser.tokenType} ${authUser.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setIsSuccess(true);
        setSuccessMessage("Remarks added successfully");
      } else {
        setIsError(true);
        setErrorMessage("Failed to add remarks");
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("Failed to add remarks.", error);
      console.error(error);
    }
  };

  const confirmHandleAction = () => {
    setIsPromptOpen(true);
  };

  const handleConfirm = async () => {
    setIsPromptOpen(false);
    await submitLogbookAction();
  };

  return (
    <>
      <LogbookSubmissionsModalView
        showModal={showModal}
        handleModalAction={handleModalAction}
        logbook={logbook}
        handleChange={handleChange}
        submitLogbookAction={submitLogbookAction}
      />

      <LoadingModal open={isSubmitting} />
      <OkayModal
        open={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          window.location.reload();
        }}
        message={successMessage}
      />
      <ErrorModal
        open={isError}
        onClose={() => setIsError(false)}
        errorMessage={errorMessage}
      />

      <PromptModal
        open={isPromptOpen}
        onConfirm={handleConfirm}
        onClose={() => setIsPromptOpen(false)}
        message={"Are you sure you want to add this feedback?"}
      />
    </>
  );
};

export default LogbookSubmissionsModalController;

import React, { useState } from "react";
import TaskScoringModalView from "../view/TaskScoringModalView";
import axios from "axios";
import LoadingModal from "../../../../Common/Modals/LoadingModal";
import OkayModal from "../../../../Common/Modals/OkayModal";
import ErrorModal from "../../../../Common/Modals/ErrorModal";
import PromptModal from "../../../../Common/Modals/PromptModal";

const TaskScoringModalController = ({
  showModal,
  handleModalAction,
  task,
  internId,
}) => {
  const [score, setScore] = useState(0.0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleScoreChange = (e) => {
    const id = parseFloat(e.target.value);
    console.log(id, typeof id);
    setScore(id);
  };

  const handleScoreAction = async () => {
    setIsSubmitting(true);
    try {
      const url =
        process.env.REACT_APP_API_BASE_URL +
        `/tasks/${task.trainingTask.id}/user/${internId}/score`;
      const response = await axios.patch(url, null, {
        params: { score },
      });
      if (response.status === 200 || response.status === 201) {
        setIsSuccess(true);
        setSuccessMessage("Score updated successfully");
      } else {
        setIsError(true);
        setErrorMessage("Failed to update score");
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setErrorMessage("Failed to update score: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmHandleAction = () => {
    setIsPromptOpen(true);
  };

  const handleConfirm = async () => {
    setIsPromptOpen(false);
    await handleScoreAction();
  };

  return (
    <>
      <TaskScoringModalView
        showModal={showModal}
        handleModalAction={handleModalAction}
        handleScoreChange={handleScoreChange}
        handleScoreAction={confirmHandleAction}
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
        message={"Are you sure you want to update the score?"}
      />
    </>
  );
};

export default TaskScoringModalController;

import React, { useState } from "react";
import CreateTrainingPlanModalView from "../view/CreateTrainingPlanModalView";
import { trainingPlanModel } from "../model/CreateTrainingPlanModalModel";
import axios from "axios";
import LoadingModal from "../../../../Common/Modals/LoadingModal";
import OkayModal from "../../../../Common/Modals/OkayModal";
import ErrorModal from "../../../../Common/Modals/ErrorModal";
import PromptModal from "../../../../Common/Modals/PromptModal";
import { useAuth } from "../../../../Common/AuthContext";

const CreateTrainingPlanModalController = ({
  mode,
  selectedTrainingPlan = null,
  showModal,
  handleModalAction,
}) => {
  const [trainingPlan, setTrainingPlan] = useState(() =>
    mode !== "create" && selectedTrainingPlan
      ? selectedTrainingPlan
      : trainingPlanModel
  );
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const { userInfo } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainingPlan((prevData) => ({
      ...prevData,
      [name]: value,
      ...(mode === "edit"
        ? { trainingPlanId: selectedTrainingPlan?.id || 0 }
        : { mentorId: userInfo.user.id }),
    }));
  };

  const handleCreateTrainingPlanAction = async () => {
    setIsSubmitting(true);
    try {
      const url = apiBaseUrl + "/training/plans";
      const response =
        mode === "edit"
          ? await axios.put(url, trainingPlan)
          : await axios.post(url, trainingPlan);

      if (response.status === 200 || response.status === 201) {
        setIsSuccess(true);
        setSuccessMessage(
          `Training plan ${
            mode === "create"
              ? "created"
              : mode === "edit"
              ? "updated"
              : "copied"
          } successfully!`
        );
      } else {
        setIsError(true);
        setErrorMessage(
          `Error ${
            mode === "create"
              ? "creating"
              : mode === "edit"
              ? "updating"
              : "copying"
          } training plan`
        );
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setErrorMessage(
        `Error ${
          mode === "create"
            ? "creating"
            : mode === "edit"
            ? "updating"
            : "copying"
        } training plan`,
        error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateTrainingPlan = () => {
    setIsPromptOpen(true);
  };

  const handleConfirm = async () => {
    setIsPromptOpen(false);
    await handleCreateTrainingPlanAction();
  };

  return (
    <>
      <CreateTrainingPlanModalView
        showModal={showModal}
        handleModalAction={handleModalAction}
        handleChange={handleChange}
        handleCreateTrainingPlan={handleCreateTrainingPlan}
        mode={mode}
        selectedTrainingPlan={trainingPlan}
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
        onClose={() => setIsPromptOpen(false)}
        onConfirm={handleConfirm}
        message={`Are you sure you want to ${
          mode === "edit" ? "update" : mode
        } this training plan?`}
      />
    </>
  );
};

export default CreateTrainingPlanModalController;

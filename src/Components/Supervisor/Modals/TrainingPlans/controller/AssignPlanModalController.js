import React, { useEffect, useState } from "react";
import AssignPlanModalView from "../view/AssignPlanModalView";
import { assingPlanModel } from "../model/AssignPlanModalModel";
import { useAuth } from "../../../../Common/AuthContext";
import axios from "axios";
import LoadingModal from "../../../../Common/Modals/LoadingModal";
import OkayModal from "../../../../Common/Modals/OkayModal";
import ErrorModal from "../../../../Common/Modals/ErrorModal";
import PromptModal from "../../../../Common/Modals/PromptModal";
import { fetchStudentsByMentor } from "../../../TrainingPlans/model/MentorTrainingPlanModel";

const AssignPlanModalController = ({
  handleAssignModalAction,
  trainingPlanDetails,
}) => {
  const { authUser } = useAuth();
  const [assign, setAssign] = useState({
    ...assingPlanModel,
    trainingPlanId: trainingPlanDetails.id,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [students, setStudents] = useState({ interns: [] });
  const { userInfo } = useAuth();

  useEffect(() => {
    const getMentorInterns = async () => {
      try {
        const response = await fetchStudentsByMentor(userInfo.user.id);
        setStudents(response);
      } catch (error) {
        console.error(error);
      }
    };

    getMentorInterns();
  }, []);

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    setAssign((prevData) => {
      if (index !== null) {
        const updatedTaskWithDueDtos = [...prevData.taskWithDueDtos];
        updatedTaskWithDueDtos[index] = {
          ...updatedTaskWithDueDtos[index],
          taskId: trainingPlanDetails.tasks[index].id,
          [name]: value,
        };
        return {
          ...prevData,
          taskWithDueDtos: updatedTaskWithDueDtos,
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleAssignPlanAction = async () => {
    setIsSubmitting(true);
    try {
      const url = process.env.REACT_APP_API_BASE_URL + "/training/plans/assign";
      const response = await axios.put(url, assign, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authUser.tokenType} ${authUser.accessToken}`,
        },
      });

      if (response.status !== 200 || response.status !== 201) {
        setIsError(true);
        setErrorMessage("Error assigning training plan.");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setErrorMessage("Error assigning training plan: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmAssign = () => {
    setIsPromptOpen(true);
  };

  const handleConfirm = async () => {
    setIsPromptOpen(false);
    await handleAssignPlanAction();
  };
  return (
    <>
      <AssignPlanModalView
        handleAssignModalAction={handleAssignModalAction}
        handleChange={handleChange}
        handleAssignPlanAction={handleConfirmAssign}
        students={students}
        trainingPlanDetails={trainingPlanDetails}
      />

      <LoadingModal open={isSubmitting} />
      <OkayModal
        open={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          window.location.reload();
        }}
        message="Training plan assigned successfully"
      />

      <ErrorModal
        open={isError}
        onClose={() => setIsError(false)}
        message={errorMessage}
      />

      <PromptModal
        onConfirm={handleConfirm}
        onClose={() => setIsPromptOpen(false)}
        open={isPromptOpen}
        message={"Are you sure you want to assign this training plan?"}
      />
    </>
  );
};

export default AssignPlanModalController;

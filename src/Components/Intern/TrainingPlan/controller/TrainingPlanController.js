import React, { useState, useEffect } from "react";
import TrainingPlanView from "../view/TrainingPlanView";
import { useAuth } from "../../../Common/AuthContext";
import axios from "axios";
import LoadingModal from "../../../Common/Modals/LoadingModal";
import OkayModal from "../../../Common/Modals/OkayModal";
import ErrorModal from "../../../Common/Modals/ErrorModal";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const TrainingPlanController = () => {
  const [trainingPlans, setTrainingPlans] = useState(null);
  const { userInfo } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const id = userInfo.user.id;
  const [showModal, setShowModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("tp");
  const [tab, setTab] = useState({
    tp: true,
    graded: false,
    completed: false,
    ongoing: false,
    pastDue: false,
  });

  useEffect(() => {
    const fetchTrainingPlan = async () => {
      setIsSubmitting(true);
      try {
        const response = await axios.get(`${apiBaseUrl}/training/plans/student/${id}`);
        setTrainingPlans(response.data);
        setIsSuccess(true);
      } catch (error) {
        console.error(error)
        setIsError(true);
        setErrorMessage(error.response?.data?.errors[0].message || error.message);
      } finally {
        setIsSubmitting(false);
      }
    };
    fetchTrainingPlan();
  }, [id]);

  const handleTabChange = (selectedTab) => {
    setTab((prevState) => {
      const updatedTab = { ...prevState };
      Object.keys(updatedTab).forEach((key) => {
        updatedTab[key] = key === selectedTab;
      });
      return updatedTab;
    });
    setCurrentTab(selectedTab);
  };

  const handleModalAction = () => setShowModal(!showModal);

  return (
    <>
      <TrainingPlanView
        showModal={showModal}
        handleModalAction={handleModalAction}
        tab={tab}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        trainingPlans={trainingPlans}
      />
      <LoadingModal open={isSubmitting} />
        <OkayModal
          open={isSuccess}
          onClose={() => setIsSuccess(false)}
          message="Student training plan fetched successfully!"
        />
        <ErrorModal
          open={isError}
          onClose={() => setIsError(false)}
          errorMessage={errorMessage}
        />
    </>
  );
};

export default TrainingPlanController;

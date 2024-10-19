import React, { useEffect, useState } from "react";
import TrainingPlansView from "../view/TrainingPlansView";
import { TrainingPlans } from "../model/TrainingPlansModel";
import { useGlobalState } from "../../../Globals/variables";
import axios from "axios";

const TrainingPlansController = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModalAction = () => setShowModal(!showModal);
  const [systemGeneratedPlans, setSystemGeneratedPlans] = useState([]);
  const { getSystemGeneratedTrainingPlans } = useGlobalState();
  const fetchSystemGeneratedPlans = async () => {
    try {
      const response = await getSystemGeneratedTrainingPlans();
      setSystemGeneratedPlans(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSystemGeneratedPlans();
  }, []);

  const getTrainingPlanDetails = async (trainingPlanId) => {
    try {
      const url =
        process.env.REACT_APP_API_BASE_URL +
        `/training/plans/${trainingPlanId}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TrainingPlansView
      TrainingPlans={systemGeneratedPlans}
      showModal={showModal}
      handleModalAction={handleModalAction}
      getTrainingPlanDetails={getTrainingPlanDetails}
    />
  );
};

export default TrainingPlansController;

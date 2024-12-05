import React, { useEffect, useState } from "react";
import TrainingPlansView from "../view/TrainingPlansView";
import { TrainingPlans } from "../model/TrainingPlansModel";
import { useGlobalState } from "../../../Globals/variables";
import axios from "axios";
import LoadingModal from "../../../Common/Modals/LoadingModal";

const TrainingPlansController = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModalAction = () => setShowModal(!showModal);
  const [systemGeneratedPlans, setSystemGeneratedPlans] = useState([]);
  const { getSystemGeneratedTrainingPlans } = useGlobalState();
  const [loading, setLoading] = useState(false);

  const fetchSystemGeneratedPlans = async () => {
    setLoading(true);
    try {
      const response = await getSystemGeneratedTrainingPlans();
      setSystemGeneratedPlans(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
    <>
      <TrainingPlansView
        TrainingPlans={systemGeneratedPlans}
        showModal={showModal}
        handleModalAction={handleModalAction}
        getTrainingPlanDetails={getTrainingPlanDetails}
      />
      <LoadingModal open={loading} />
    </>
  );
};

export default TrainingPlansController;

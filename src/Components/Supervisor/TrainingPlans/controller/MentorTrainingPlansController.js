import React, { useEffect, useState } from "react";
import MentorTrainingPlansView from "../view/MentorTrainingPlansView";
import { MentorTrainingPlans } from "../model/MentorTrainingPlansModel";
import { useGlobalState } from "../../../Globals/variables";
import axios from "axios";

const MentorTrainingPlansController = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleCreateModalAction = () => setShowCreateModal(!showCreateModal);
  const [tab, setTab] = useState({
    myPlans: true,
    systemGenerated: false,
  });
  const { getSystemGeneratedTrainingPlans } = useGlobalState();
  const [systemGeneratedPlans, setSystemGeneratedPlans] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleTabChange = (plans) => {
    setTab({ myPlans: plans, systemGenerated: !plans });
  };

  const fetchSystemGeneratedPlans = async () => {
    try {
      const response = await getSystemGeneratedTrainingPlans();
      setSystemGeneratedPlans(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getTrainingPlanDetails = async (trainingPlanId) => {
    try {
      const url = apiBaseUrl + `/training/plans/${trainingPlanId}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSystemGeneratedPlans();
  }, []);

  return (
    <MentorTrainingPlansView
      TrainingPlans={MentorTrainingPlans}
      showCreateModal={showCreateModal}
      handleCreateModalAction={handleCreateModalAction}
      tab={tab}
      handleTabChange={handleTabChange}
      systemGeneratedPlans={systemGeneratedPlans}
      getTrainingPlanDetails={getTrainingPlanDetails}
    />
  );
};

export default MentorTrainingPlansController;

import React, { useEffect, useState } from "react";
import MentorTrainingPlansView from "../view/MentorTrainingPlansView";
import { useGlobalState } from "../../../Globals/variables";
import { MentorTrainingPlans } from "../model/MentorTrainingPlanModel";
import { useAuth } from "../../../Common/AuthContext";
import LoadingModal from "../../../Common/Modals/LoadingModal";

const MentorTrainingPlansController = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleCreateModalAction = () => setShowCreateModal(!showCreateModal);
  const [tab, setTab] = useState({
    myPlans: true,
    systemGenerated: false,
  });
  const { getSystemGeneratedTrainingPlans } = useGlobalState();
  const [systemGeneratedPlans, setSystemGeneratedPlans] = useState([]);
  const { userInfo } = useAuth();
  const [myTrainingPlans, setMyTrainingPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (plans) => {
    setTab({ myPlans: plans, systemGenerated: !plans });
  };

  const fetchSystemGeneratedPlans = async () => {
    setLoading(true);
    try {
      const response = await getSystemGeneratedTrainingPlans();
      setSystemGeneratedPlans(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getMentorTrainingPlans = async () => {
    try {
      const response = await MentorTrainingPlans(userInfo.user.id);
      console.log(response);
      setMyTrainingPlans(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemGeneratedPlans();
    getMentorTrainingPlans();
  }, []);

  return (
    <>
      <MentorTrainingPlansView
        TrainingPlans={myTrainingPlans}
        showCreateModal={showCreateModal}
        handleCreateModalAction={handleCreateModalAction}
        tab={tab}
        handleTabChange={handleTabChange}
        systemGeneratedPlans={systemGeneratedPlans}
      />
      <LoadingModal open={loading} />
    </>
  );
};

export default MentorTrainingPlansController;

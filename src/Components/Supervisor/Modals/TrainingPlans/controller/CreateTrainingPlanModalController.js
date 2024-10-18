import React, { useState } from "react";
import CreateTrainingPlanModalView from "../view/CreateTrainingPlanModalView";
import { trainingPlanModel } from "../model/CreateTrainingPlanModalModel";
import axios from "axios";

const CreateTrainingPlanModalController = ({
  showModal,
  handleModalAction,
}) => {
  const [trainingPlan, setTrainingPlan] = useState(trainingPlanModel);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleCreateTrainingPlanAction = async () => {
    try {
      const url = apiBaseUrl + "/training/plans";
      const response = await axios.post(url, trainingPlan);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainingPlan((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTaskChange = (e, index) => {
    const { name, value } = e.target;
    setTrainingPlan((prevData) => {
      const list = [...prevData.tasks];
      list[index] = {
        ...list[index],
        [name]: value,
      };
      return { ...prevData, tasks: list };
    });
  };

  const handleTechStackAndSkillChange = (
    e,
    taskIndex,
    techStackIndex,
    skillIndex
  ) => {
    const { name, value } = e.target;
    setTrainingPlan((prevData) => {
      const taskList = [...prevData.tasks];
      const techStackList = [...taskList[taskIndex].techStacks];
      const skillList = [...taskList[taskIndex].skills];

      techStackList[techStackIndex] = {
        ...techStackList[techStackIndex],
        [name]: value,
      };

      skillList[skillIndex] = {
        ...skillList[skillIndex],
        [name]: value,
      };

      taskList[taskIndex] = {
        ...taskList[taskIndex],
        techStacks: techStackList,
        skills: skillList,
      };
      return { ...prevData, tasks: taskList };
    });
  };

  return (
    <CreateTrainingPlanModalView
      showModal={showModal}
      handleModalAction={handleModalAction}
      handleChange={handleChange}
      handleTaskChange={handleTaskChange}
      handleTechStackAndSkillChange={handleTechStackAndSkillChange}
      handleCreateTrainingPlanAction={handleCreateTrainingPlanAction}
    />
  );
};

export default CreateTrainingPlanModalController;

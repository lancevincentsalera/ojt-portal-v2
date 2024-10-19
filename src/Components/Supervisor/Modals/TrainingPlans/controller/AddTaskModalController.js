import React, { useEffect, useState } from "react";
import AddTaskModalView from "../view/AddTaskModalView";
import {
  addTaskModel,
  getSystemSkills,
  getSystemTechStacks,
} from "../model/AddTaskModalModel";
import axios from "axios";
import LoadingModal from "../../../../Common/Modals/LoadingModal";
import OkayModal from "../../../../Common/Modals/OkayModal";
import ErrorModal from "../../../../Common/Modals/ErrorModal";
import PromptModal from "../../../../Common/Modals/PromptModal";

const AddTaskModalController = ({
  handleAddTaskModalAction,
  trainingPlanDetails,
}) => {
  const [task, setTask] = useState(addTaskModel);
  const [skills, setSkills] = useState([]);
  const [techStacks, setTechStacks] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [techStackIdList, setTechStackIdList] = useState([]);
  const [skillIdList, setSkillIdList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
  };

  const fetchSkills = async (nameFilter) => {
    try {
      const response = await getSystemSkills(nameFilter);
      setSkills(response.filter((skill, i) => response.indexOf(skill) === i));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTechStacks = async (typeFilter) => {
    try {
      const response = await getSystemTechStacks(typeFilter);
      setTechStacks(
        response.filter(
          (techStack, i) =>
            response.findIndex((t) => t.name === techStack.name) === i
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSkills(nameFilter);
    fetchTechStacks(typeFilter);
  }, [typeFilter, nameFilter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevData) => ({
      ...prevData,
      [name]: value,
      trainingPlanId: trainingPlanDetails.id,
    }));
  };

  const handleTechstackChange = (e) => {
    const { value } = e.target;
    const id = parseInt(value, 10);
    if (e.target.checked) {
      setTechStackIdList([...techStackIdList, id]);
    } else {
      setTechStackIdList(
        techStackIdList.filter((techStackId) => techStackId !== id)
      );
    }
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    const id = parseInt(value, 10);
    if (checked) {
      setSkillIdList([...skillIdList, id]);
    } else {
      setSkillIdList(skillIdList.filter((skillId) => skillId !== id));
    }
  };

  const handleAddTaskAction = async () => {
    setIsSubmitting(true);
    try {
      const formattedTask = {
        ...task,
        techStacks: techStackIdList
          .map((id) => {
            const techStack = techStacks.find(
              (techStack) => techStack.id === id
            );
            if (techStack) {
              const { isSystemGenerated, id: _, ...rest } = techStack;
              return rest;
            }
            return null;
          })
          .filter(Boolean), // Only include non-null values
        skills: skillIdList
          .map((id) => {
            const skill = skills.find((skill) => skill.id === id);
            if (skill) {
              const { isSystemGenerated, id: _, ...rest } = skill;
              return rest;
            }
            return null;
          })
          .filter(Boolean), // Only include non-null values
      };
      const url = process.env.REACT_APP_API_BASE_URL + "/tasks/add";
      const response = await axios.put(url, formattedTask);

      if (response.status === 200) {
        setIsSuccess(true);
      } else {
        setIsError(true);
        setErrorMessage("Error adding task.");
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setErrorMessage("Error adding task: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCustomTechstackChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setTask((prevData) => ({
      ...prevData,
      techStacks: [
        ...prevData.techStacks,
        {
          [name]: value,
        },
      ],
    }));
  };

  const handleCustomSkillChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setTask((prevData) => ({
      ...prevData,
      skills: [
        ...prevData.skills,
        {
          [name]: value,
        },
      ],
    }));
  };

  useEffect(() => {
    trainingPlanDetails.tasks = [...trainingPlanDetails.tasks, task];
  }, [trainingPlanDetails, task]);

  useEffect(() => {
    setTask((prevData) => ({
      ...prevData,
      techStacks: techStackIdList
        .map((id) => {
          const techStack = techStacks.find((techStack) => techStack.id === id);
          if (techStack) {
            const { isSystemGenerated, id: _, ...rest } = techStack;
            return rest;
          }
          return null;
        })
        .filter(Boolean),
      skills: skillIdList
        .map((id) => {
          const skill = skills.find((skill) => skill.id === id);
          if (skill) {
            const { isSystemGenerated, id: _, ...rest } = skill;
            return rest;
          }
          return null;
        })
        .filter(Boolean),
    }));
  }, [techStackIdList, skillIdList, skills, techStacks]);

  const handleConfirmAddTask = () => {
    setIsPromptOpen(true);
  };

  const handleConfirm = async () => {
    setIsPromptOpen(false);
    await handleAddTaskAction();
  };

  return (
    <>
      <AddTaskModalView
        handleAddTaskModalAction={handleAddTaskModalAction}
        handleChange={handleChange}
        handleTechstackChange={handleTechstackChange}
        handleSkillChange={handleSkillChange}
        handleAddTaskAction={handleConfirmAddTask}
        skills={skills}
        techStacks={techStacks}
        handleTypeFilterChange={handleTypeFilterChange}
        handleNameFilterChange={handleNameFilterChange}
        handleCustomTechstackChange={handleCustomTechstackChange}
        handleCustomSkillChange={handleCustomSkillChange}
        techStackIdList={techStackIdList}
        skillIdList={skillIdList}
      />

      <LoadingModal open={isSubmitting} />
      <OkayModal
        open={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          window.location.reload();
        }}
        message={"Task added successfully!"}
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
        message={"Are you sure you want to add this task?"}
      />
    </>
  );
};

export default AddTaskModalController;

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
  setTrainingPlanDetails,
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
  const [skill, setSkill] = useState({ name: "", description: "" });
  const [techStack, setTechStack] = useState({
    name: "",
    type: "",
    description: "",
  });
  const [skillList, setSkillList] = useState([]);
  const [techStackList, setTechStackList] = useState([]);
  const [allTechStacks, setAllTechStacks] = useState([]);
  const [allSkills, setAllSkills] = useState([]);

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
  };

  const fetchData = async (
    fetchFunction,
    setFilteredData,
    setAllData,
    filterValue,
    type
  ) => {
    try {
      const response = await fetchFunction("");
      const filteredResponse = response.filter(
        (item, i) =>
          response.findIndex(
            (el) => el.name.toLowerCase() === item.name.toLowerCase()
          ) === i
      );
      setAllData(filteredResponse);

      const filteredData = filterValue
        ? filteredResponse.filter((item) =>
            (type === "s" ? item.name : item.type)
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          )
        : filteredResponse;
      setFilteredData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSkills = (nameFilter) =>
    fetchData(getSystemSkills, setSkills, setAllSkills, nameFilter, "s");
  const fetchTechStacks = (typeFilter) =>
    fetchData(
      getSystemTechStacks,
      setTechStacks,
      setAllTechStacks,
      typeFilter,
      "t"
    );

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
    const selectedTechStack = techStacks.find((tech) => tech.id === id);
    if (e.target.checked) {
      setTechStackIdList([...techStackIdList, id]);
    } else {
      handleRemoveTechstack(selectedTechStack);
    }
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    const id = parseInt(value, 10);
    const selectedSkill = skills.find((skill) => skill.id === id);
    if (checked) {
      setSkillIdList([...skillIdList, id]);
    } else {
      handleRemoveSkill(selectedSkill);
    }
  };

  const handleRemoveTechstack = (techStack) => {
    setTechStackIdList((prev) =>
      prev.filter((techStackId) => techStackId !== techStack.id)
    );
    setTechStackList((prev) =>
      prev.filter((tech) => tech.name !== techStack.name)
    );
  };

  const handleRemoveSkill = (skill) => {
    setSkillIdList((prev) => prev.filter((skillId) => skillId !== skill.id));
    setSkillList((prev) => prev.filter((s) => s.name !== skill.name));
  };

  const handleAddTaskAction = async () => {
    console.log("task ", task);
    setIsSubmitting(true);
    try {
      setTrainingPlanDetails((prevData) => ({
        ...prevData,
        tasks: [...prevData.tasks, task],
      }));
      const url = process.env.REACT_APP_API_BASE_URL + "/tasks/add";
      const response = await axios.put(url, task);

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
    setTechStack((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCustomSkillChange = (e) => {
    const { name, value } = e.target;
    setSkill((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const mapNewList = (list, idList) => {
      return idList
        .map((id) => {
          const elem = list.find((item) => item.id === id);
          if (elem) {
            const { isSystemGenerated, id: _, ...rest } = elem;
            return rest;
          }
          return null;
        })
        .filter(Boolean);
    };

    const newTechStackList = mapNewList(techStacks, techStackIdList);
    const newSkillList = mapNewList(skills, skillIdList);

    const filterList = (list, newList) => {
      const updatedList = [...list, ...newList];
      return updatedList.filter(
        (item, i) => updatedList.findIndex((el) => el.name === item.name) === i
      );
    };

    setTechStackList((prev) => filterList(prev, newTechStackList));
    setSkillList((prev) => filterList(prev, newSkillList));

    setTask((prevData) => ({
      ...prevData,
      techStacks: filterList(prevData.techStacks, newTechStackList),
      skills: filterList(prevData.skills, newSkillList),
    }));
  }, [techStackIdList, skillIdList, skills, techStacks]);

  const addCustomTechstack = () => {
    const updatedTechStackList = [...techStackList, techStack];
    setTechStackList(updatedTechStackList);
    setTask((prevData) => ({
      ...prevData,
      techStacks: updatedTechStackList,
    }));
    setTechStack({ name: "", type: "", description: "" });
  };

  const addCustomSkill = () => {
    const updatedSkillList = [...skillList, skill];
    setSkillList(updatedSkillList);
    setTask((prevData) => ({
      ...prevData,
      skills: updatedSkillList,
    }));
    setSkill({ name: "", description: "" });
  };

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
        addCustomTechstack={addCustomTechstack}
        addCustomSkill={addCustomSkill}
        techStackList={techStackList}
        skillList={skillList}
        skill={skill}
        techStack={techStack}
        handleRemoveTechstack={handleRemoveTechstack}
        handleRemoveSkill={handleRemoveSkill}
        allTechStacks={allTechStacks}
        allSkills={allSkills}
      />

      <LoadingModal open={isSubmitting} />
      <OkayModal
        open={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          handleAddTaskModalAction();
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

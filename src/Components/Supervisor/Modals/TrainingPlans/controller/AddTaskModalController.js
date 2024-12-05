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
  mode,
  taskToEdit,
  handleAddTaskModalAction,
  trainingPlanDetails,
  setTrainingPlanDetails,
}) => {
  const [task, setTask] = useState(() =>
    mode === "add" ? addTaskModel : taskToEdit
  );
  const [skills, setSkills] = useState([]);
  const [techStacks, setTechStacks] = useState([]);
  const [techStackIdList, setTechStackIdList] = useState([]);
  const [skillIdList, setSkillIdList] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [skill, setSkill] = useState({ name: "", description: "" });
  const [techStack, setTechStack] = useState({
    name: "",
    type: "",
    description: "",
  });
  const [skillList, setSkillList] = useState(() => {
    if (mode === "add") return [];
    return taskToEdit.skills.map(
      ({ isSystemGenerated, id: _, ...rest }) => rest
    );
  });
  const [techStackList, setTechStackList] = useState(() => {
    if (mode === "add") return [];
    return taskToEdit.techStacks.map(
      ({ isSystemGenerated, id: _, ...rest }) => rest
    );
  });
  const [allTechStacks, setAllTechStacks] = useState([]);
  const [allSkills, setAllSkills] = useState([]);

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
  };

  const fetchAllData = async (fetchFunction, setAllData, type) => {
    try {
      const response = await fetchFunction("");
      const seen = new Set();
      let filteredResponse = response.filter((item) => {
        const lowerName = item.name.toLowerCase();
        if (seen.has(lowerName)) {
          return false;
        }
        seen.add(lowerName);
        return true;
      });

      if (taskToEdit && mode === "edit") {
        const taskItems =
          type === "t" ? taskToEdit.techStacks : taskToEdit.skills;

        const responseMap = new Map(
          filteredResponse.map((el) => [el.name.toLowerCase(), el])
        );

        taskItems.forEach((item) => {
          const lowerName = item.name.toLowerCase();
          if (!responseMap.has(lowerName)) {
            filteredResponse.push(item);
            responseMap.set(lowerName, item);
          }
        });

        const idList = taskItems
          .map((item) => responseMap.get(item.name.toLowerCase())?.id || null)
          .filter(Boolean);

        if (
          type === "t" &&
          JSON.stringify(idList) !== JSON.stringify(techStackIdList)
        ) {
          setTechStackIdList(idList);
        } else if (
          type === "s" &&
          JSON.stringify(idList) !== JSON.stringify(skillIdList)
        ) {
          setSkillIdList(idList);
        }
      }

      setAllData(filteredResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllData(getSystemSkills, setAllSkills, "s");
    fetchAllData(getSystemTechStacks, setAllTechStacks, "t");
  }, [taskToEdit, mode]);

  useEffect(() => {
    if (allSkills.length > 0) {
      fetchSkills(nameFilter);
    }
  }, [allSkills, nameFilter]);

  useEffect(() => {
    if (allTechStacks.length > 0) {
      fetchTechStacks(typeFilter);
    }
  }, [allTechStacks, typeFilter]);

  const fetchData = async (
    setFilteredData,
    filteredResponse,
    filterValue,
    type
  ) => {
    if (filteredResponse.length > 0) {
      const filteredData = filterValue
        ? filteredResponse.filter((item) =>
            (type === "s" ? item.name : item.type)
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          )
        : filteredResponse;
      setFilteredData(filteredData);
    }
  };

  const fetchSkills = (nameFilter) =>
    fetchData(setSkills, allSkills, nameFilter, "s");
  const fetchTechStacks = (typeFilter) =>
    fetchData(setTechStacks, allTechStacks, typeFilter, "t");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevData) => ({
      ...prevData,
      [name]: value,
      ...(mode === "add"
        ? { trainingPlanId: trainingPlanDetails.id }
        : { taskId: taskToEdit.id }),
    }));
  };

  const handleTechstackChange = (e) => {
    const { value } = e.target;
    const id = parseInt(value, 10);
    const responseMap = new Map(techStacks.map((el) => [el.id, el]));
    const selectedTechStack = responseMap.get(id);
    if (e.target.checked) {
      setTechStackIdList([...techStackIdList, id]);
    } else {
      handleRemoveTechstack(selectedTechStack);
    }
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    const id = parseInt(value, 10);
    const responseMap = new Map(skills.map((el) => [el.id, el]));
    const selectedSkill = responseMap.get(id);
    if (checked) {
      setSkillIdList([...skillIdList, id]);
    } else {
      handleRemoveSkill(selectedSkill);
    }
  };

  const handleRemoveTechstack = (techStack) => {
    if (techStack) {
      setTechStackIdList((prev) =>
        prev.filter((techStackId) => techStackId !== techStack.id)
      );
      setTechStackList((prev) =>
        prev.filter((tech) => tech.name !== techStack.name)
      );
    }
  };

  const handleRemoveSkill = (skill) => {
    if (skill) {
      setSkillIdList((prev) => prev.filter((skillId) => skillId !== skill.id));
      setSkillList((prev) => prev.filter((s) => s.name !== skill.name));
    }
  };

  const handleAddTaskAction = async () => {
    setIsSubmitting(true);
    try {
      if (
        (skillList && skillList.length === 0) ||
        (techStackList && techStackList.length === 0)
      ) {
        setIsError(true);
        setErrorMessage("Please select at least one skill and tech stack");
        return;
      }
      setTrainingPlanDetails((prevData) => ({
        ...prevData,
        tasks: [...prevData.tasks, task],
      }));
      const api = mode === "add" ? "/tasks/add" : `/tasks/`;
      const url = process.env.REACT_APP_API_BASE_URL + api;
      const response = await axios.put(url, task);

      if (response.status === 200 || response.status === 201) {
        setIsSuccess(true);
        setSuccessMessage(
          `Task ${mode === "add" ? "added" : "updated"} successfully!`
        );
      } else {
        setIsError(true);
        setErrorMessage(`Error ${mode === "add" ? "adding" : "updating"} task`);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setErrorMessage(
        `Error ${mode === "add" ? "adding" : "updating"} task: `,
        error
      );
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
      const responseMap = new Map(list.map((el) => [el.id, el]));
      return idList
        .map((id) => {
          const elem = responseMap.get(id);
          if (elem) {
            const { isSystemGenerated, id: _, ...rest } = elem;
            return rest;
          }
          return null;
        })
        .filter(Boolean);
    };

    console.log("techStackIdList", techStackIdList);
    console.log("skillIdList", skillIdList);

    const newTechStackList = mapNewList(allTechStacks, techStackIdList);
    const newSkillList = mapNewList(allSkills, skillIdList);

    console.log("newTechStackList", newTechStackList);
    console.log("newSkillList", newSkillList);

    const filterList = (list, newList) => {
      const updatedList = [...list, ...newList];
      const seen = new Set();
      return updatedList.filter((item, i) => {
        const name = item.name;
        if (seen.has(name)) return false;
        seen.add(name);
        return true;
      });
    };

    setTechStackList((prev) => filterList(prev, newTechStackList));
    setSkillList((prev) => filterList(prev, newSkillList));
  }, [techStackIdList, skillIdList, mode, allSkills, allTechStacks]);

  useEffect(() => {
    setTask((prevData) => ({
      ...prevData,
      techStacks: techStackList,
      skills: skillList,
      ...(mode === "add"
        ? { trainingPlanId: trainingPlanDetails.id }
        : { taskId: taskToEdit.id }),
    }));
  }, [skillList, techStackList]);

  const addCustomTechstack = () => {
    if (techStack.name && techStack.type && techStack.description) {
      const updatedTechStackList = [...techStackList, techStack];
      setTechStackList(updatedTechStackList);
      setTask((prevData) => ({
        ...prevData,
        techStacks: updatedTechStackList,
      }));
      setTechStack({ name: "", type: "", description: "" });
    }
  };

  const addCustomSkill = () => {
    if (skill.name && skill.description) {
      const updatedSkillList = [...skillList, skill];
      setSkillList(updatedSkillList);
      setTask((prevData) => ({
        ...prevData,
        skills: updatedSkillList,
      }));
      setSkill({ name: "", description: "" });
    }
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
        task={task}
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
        mode={mode}
      />

      <LoadingModal open={isSubmitting} />
      <OkayModal
        open={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          // window.location.reload();
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
        onConfirm={handleConfirm}
        onClose={() => setIsPromptOpen(false)}
        message={`Are you sure you want to ${
          mode === "add" ? "add" : "update"
        } this task?`}
      />
    </>
  );
};

export default AddTaskModalController;

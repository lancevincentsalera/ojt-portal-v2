import axios from "axios";

export const getSystemTechStacks = async (type) => {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "/techstacks";
    const response = await axios.get(url, {
      params: {
        typeFilter: type,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSystemSkills = async (name) => {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "/skills";
    const response = await axios.get(url, {
      params: {
        nameFilter: name,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addTaskModel = {
  title: "",
  description: "",
  difficulty: "",
  techStacks: [
    {
      name: "",
      type: "",
      description: "",
    },
  ],
  skills: [
    {
      name: "",
      description: "",
    },
  ],
  trainingPlanId: 0,
};

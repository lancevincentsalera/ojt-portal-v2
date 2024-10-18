import axios from "axios";

export const trainingPlanModel = {
  mentorId: 0,
  title: "",
  description: "",
};

export const getSystemTechStacks = async () => {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "/techstacks";
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSystemSkills = async () => {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "/skills";
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
